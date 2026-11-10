import type { Metadata } from "next";
import BookingForm from "@/components/BookingForm";
import { business } from "@/lib/config";

export const metadata: Metadata = { title: "Book a shoot | Beyond the Frame", description: "Tell me what you have in mind. Send your details on WhatsApp or email." };

export default function Page() {
  return (
    <div className="wrap" style={{ paddingBottom: "5rem" }}>
      <div className="page-title">
        <h1 className="display">Book a shoot</h1>
        <p className="lede" style={{ marginTop: "1.25rem" }}>Fill in the details and I’ll prepare a message you can send on WhatsApp or by email. I usually reply within a day.</p>
      </div>
      <div className="two-col">
        <BookingForm />
        <div>
          <h2 className="display" style={{ fontSize: "var(--s-2)", marginBottom: "1rem" }}>Prefer to talk?</h2>
          <ul className="checks">
            {business.phones.map((p) => <li key={p}><a href={`tel:+977${p}`}>{p}</a></li>)}
            <li><a href={`https://wa.me/977${business.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp {business.whatsapp}</a></li>
            <li><a href={`mailto:${business.email}`}>{business.email}</a></li>
          </ul>
          <p className="muted" style={{ marginTop: "1.5rem" }}>Based in {business.base}.</p>
        </div>
      </div>
    </div>
  );
}
