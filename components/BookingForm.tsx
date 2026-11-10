"use client";
import { useEffect, useRef, useState } from "react";
import { bookingSchema, buildMessage, mailtoUrl, whatsappUrl, type BookingClean, type BookingInput } from "@/lib/booking";
import { serviceGroups } from "@/lib/services";

type Key = keyof BookingInput;
type Errors = Partial<Record<Key, string>>;
const empty: BookingInput = { name: "", phone: "", email: "", service: "", date: "", place: "", budget: "", message: "" };
const labels: Record<Key, string> = { name: "Your name", phone: "Phone number", email: "Email", service: "Service", date: "Date of the shoot", place: "Place", budget: "Budget", message: "Notes" };

function check(v: BookingInput): { errors: Errors; data?: BookingClean } {
  const r = bookingSchema.safeParse(v);
  if (r.success) return { errors: {}, data: r.data };
  const errors: Errors = {};
  for (const i of r.error.issues) {
    const k = i.path[0] as Key;
    if (k && !errors[k]) errors[k] = i.message;
  }
  return { errors };
}

export default function BookingForm() {
  const [v, setV] = useState<BookingInput>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [touched, setTouched] = useState<Partial<Record<Key, boolean>>>({});
  const [attempted, setAttempted] = useState(false);
  const [sent, setSent] = useState<{ text: string; wa: string; mail: string } | null>(null);
  const [minDate, setMinDate] = useState("");
  const summary = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const d = new Date();
    setMinDate(`${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`);
  }, []);

  const set = (k: Key, val: string) => {
    const next = { ...v, [k]: val };
    setV(next);
    if (touched[k] || attempted) setErrors(check(next).errors);
  };
  const blur = (k: Key) => {
    setTouched((t) => ({ ...t, [k]: true }));
    setErrors(check(v).errors);
  };
  const show = (k: Key) => (touched[k] || attempted ? errors[k] : undefined);

  const submit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // Honeypot: real visitors never see or fill this field.
    if (new FormData(e.currentTarget).get("company")) { setSent({ text: "", wa: "", mail: "" }); return; }
    const { errors: errs, data } = check(v);
    setErrors(errs);
    setAttempted(true);
    if (!data) { setTimeout(() => summary.current?.focus(), 0); return; }
    const text = buildMessage(data);
    setSent({ text, wa: whatsappUrl(text), mail: mailtoUrl(text) });
  };

  if (sent) {
    return (
      <div className="sent" role="status">
        <h2>{sent.wa ? "Ready to send" : "Thanks"}</h2>
        {sent.wa ? (
          <>
            <p className="muted" style={{ marginTop: "0.5rem" }}>Your details are filled in. Choose how to send them to me. Nothing has been sent yet.</p>
            <div className="hero-actions">
              <a className="btn btn-primary" href={sent.wa} target="_blank" rel="noopener noreferrer">Send on WhatsApp</a>
              <a className="btn btn-quiet" href={sent.mail}>Send by email</a>
              <button type="button" className="btn btn-quiet" onClick={() => setSent(null)}>Edit details</button>
            </div>
            <pre>{sent.text}</pre>
          </>
        ) : <p className="muted">I will get back to you soon.</p>}
      </div>
    );
  }

  const errKeys = (Object.keys(errors) as Key[]).filter((k) => errors[k]);
  const field = (k: Key) => ({
    id: `bf-${k}`, name: k, value: v[k], onChange: (e: { target: { value: string } }) => set(k, e.target.value), onBlur: () => blur(k),
    "aria-invalid": show(k) ? true : undefined, "aria-describedby": show(k) ? `bf-${k}-err` : undefined,
  });
  const err = (k: Key) => show(k) && <p className="err" id={`bf-${k}-err`}>{errors[k]}</p>;

  return (
    <form className="form" onSubmit={submit} noValidate>
      {attempted && errKeys.length > 0 && (
        <div className="summary" ref={summary} tabIndex={-1} role="alert" aria-labelledby="bf-summary-title">
          <h2 id="bf-summary-title">Fix {errKeys.length === 1 ? "this" : "these"} to continue</h2>
          <ul>{errKeys.map((k) => <li key={k}><a href={`#bf-${k}`}>{labels[k]}: {errors[k]}</a></li>)}</ul>
        </div>
      )}
      <div className="row2">
        <div className="field"><label htmlFor="bf-name">Your name</label><input type="text" autoComplete="name" maxLength={80} {...field("name")} />{err("name")}</div>
        <div className="field"><label htmlFor="bf-phone">Phone number</label><input type="tel" inputMode="tel" autoComplete="tel" placeholder="98XXXXXXXX" {...field("phone")} />{err("phone")}</div>
      </div>
      <div className="field"><label htmlFor="bf-email">Email <span className="muted">(optional)</span></label><input type="email" autoComplete="email" maxLength={120} {...field("email")} />{err("email")}</div>
      <div className="row2">
        <div className="field">
          <label htmlFor="bf-service">Service</label>
          <select {...field("service")}>
            <option value="">Choose a service</option>
            {serviceGroups.map((g) => (
              <optgroup key={g.id} label={g.title}>
                {g.items.map((s) => <option key={s.id} value={s.id}>{s.title} (from NPR {s.priceNPR.toLocaleString("en-US")})</option>)}
              </optgroup>
            ))}
            <option value="not-sure">Not sure yet</option>
          </select>
          {err("service")}
        </div>
        <div className="field"><label htmlFor="bf-date">Date of the shoot</label><input type="date" min={minDate || undefined} {...field("date")} />{err("date")}</div>
      </div>
      <div className="row2">
        <div className="field"><label htmlFor="bf-place">Place</label><input type="text" maxLength={120} placeholder="Sunwal, Butwal, Palpa…" {...field("place")} />{err("place")}</div>
        <div className="field"><label htmlFor="bf-budget">Budget in NPR <span className="muted">(optional)</span></label><input type="text" inputMode="numeric" placeholder="2500" {...field("budget")} />{err("budget")}</div>
      </div>
      <div className="field">
        <label htmlFor="bf-message">Notes <span className="muted">(optional)</span></label>
        <textarea maxLength={1000} {...field("message")} />
        <span className="hint">Anything that helps: number of people, the look you want, travel needs.</span>
        {err("message")}
      </div>
      <div className="hp" aria-hidden="true"><label>Leave this empty<input type="text" name="company" tabIndex={-1} autoComplete="off" /></label></div>
      <div><button type="submit" className="btn btn-primary">Prepare my request</button></div>
    </form>
  );
}
