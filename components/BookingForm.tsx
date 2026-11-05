"use client";
import { useState, useEffect } from "react";
import { bookingSchema } from "@/lib/validators";
import { services } from "@/lib/assets";
import { business } from "@/lib/config";
import { Send, Check, AlertCircle } from "lucide-react";

export default function BookingForm(){
  const [csrf,setCsrf]=useState("");
  useEffect(()=>{ fetch("/api/auth/csrf").then(r=>r.json()).then(d=>setCsrf(d.token)).catch(()=>setCsrf("fallback-token-1234567890"))},[]);
  const [form,setForm]=useState({ name:"", phone:"", email:"", eventType:"wedding" as any, eventDate:"", location:"", serviceId: services[0].id, budgetNPR:"", message:"", whatsappOptIn:false });
  const [errors,setErrors]=useState<Record<string,string>>({});
  const [status,setStatus]=useState<"idle"|"loading"|"success"|"error">("idle");
  const [msg,setMsg]=useState("");

  async function submit(e:React.FormEvent){
    e.preventDefault(); setErrors({}); setMsg("");
    const parsed = bookingSchema.safeParse({ ...form, budgetNPR: form.budgetNPR? Number(form.budgetNPR): undefined, csrfToken: csrf });
    if(!parsed.success){ const fe:Record<string,string>={}; parsed.error.errors.forEach(er=> fe[er.path[0] as string]=er.message); setErrors(fe); return; }
    setStatus("loading");
    try{
      const res=await fetch("/api/bookings", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify(parsed.data) });
      const data=await res.json();
      if(!res.ok) throw new Error(data.error || "Failed");
      setStatus("success"); setMsg(data.message || `Thanks! We'll reply soon via ${business.phones[0]}`);
      setTimeout(()=> setStatus("idle"), 3500);
    }catch(err:any){ setStatus("error"); setMsg(err.message || "Something went wrong"); setTimeout(()=> setStatus("idle"), 3500); }
  }

  const err=(k:string)=> errors[k] ? <p className="text-xs text-red-500 mt-1 flex gap-1"><AlertCircle size={12}/>{errors[k]}</p> : null;

  return (
    <form onSubmit={submit} noValidate className="bg-white border border-ink/10 rounded-2xl p-6 sm:p-7 space-y-4">
      <h3 className="font-display font-bold text-xl text-ink">Book Your Session</h3>
      <p className="text-sm text-ink/60">Quick reply via phone/WhatsApp. Starting prices in NPR — travel extra beyond Sunwal quoted upfront.</p>

      <div className="grid sm:grid-cols-2 gap-4">
        <label className="space-y-1.5"><span className="text-xs tracking-widest uppercase text-ink/70">Name *</span><input value={form.name} onChange={e=>setForm({...form, name:e.target.value})} placeholder="Your name" className="w-full bg-cream border border-ink/10 rounded-xl px-4 py-3 text-sm focus:border-gold/50 focus:outline-none"/>{err("name")}</label>
        <label className="space-y-1.5"><span className="text-xs tracking-widest uppercase text-ink/70">Phone (+977) *</span><input value={form.phone} onChange={e=>setForm({...form, phone:e.target.value})} placeholder="+977-98XXXXXXXX" className="w-full bg-cream border border-ink/10 rounded-xl px-4 py-3 text-sm focus:border-gold/50 focus:outline-none"/>{err("phone")}</label>
      </div>
      <label className="space-y-1.5 block"><span className="text-xs tracking-widest uppercase text-ink/70">Email *</span><input type="email" value={form.email} onChange={e=>setForm({...form, email:e.target.value})} placeholder="you@example.com" className="w-full bg-cream border border-ink/10 rounded-xl px-4 py-3 text-sm focus:border-gold/50 focus:outline-none"/>{err("email")}</label>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="space-y-1.5"><span className="text-xs tracking-widest uppercase text-ink/70">Event type *</span>
          <select value={form.eventType} onChange={e=>setForm({...form, eventType:e.target.value as any})} className="w-full bg-cream border border-ink/10 rounded-xl px-4 py-3 text-sm">
            <option value="wedding">Wedding</option><option value="portrait">Portrait</option><option value="event">Event</option><option value="travel">Travel</option><option value="commercial">Commercial</option><option value="other">Other</option>
          </select>
        </label>
        <label className="space-y-1.5"><span className="text-xs tracking-widest uppercase text-ink/70">Event date *</span><input type="date" value={form.eventDate} onChange={e=>setForm({...form, eventDate:e.target.value})} className="w-full bg-cream border border-ink/10 rounded-xl px-4 py-3 text-sm"/>{err("eventDate")}</label>
      </div>
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="space-y-1.5"><span className="text-xs tracking-widest uppercase text-ink/70">Location *</span><input value={form.location} onChange={e=>setForm({...form, location:e.target.value})} placeholder="Sunwal, Butwal, Palpa..." className="w-full bg-cream border border-ink/10 rounded-xl px-4 py-3 text-sm"/>{err("location")}</label>
        <label className="space-y-1.5"><span className="text-xs tracking-widest uppercase text-ink/70">Service *</span>
          <select value={form.serviceId} onChange={e=>setForm({...form, serviceId:e.target.value})} className="w-full bg-cream border border-ink/10 rounded-xl px-4 py-3 text-sm">
            {services.map(s=> <option key={s.id} value={s.id}>{s.title} — NPR {s.priceNPR.toLocaleString("en-NP")} from</option>)}
          </select>
        </label>
      </div>
      <label className="space-y-1.5 block"><span className="text-xs tracking-widest uppercase text-ink/70">Budget (NPR)</span><input type="number" value={form.budgetNPR} onChange={e=>setForm({...form,budgetNPR:e.target.value})} placeholder="e.g. 2000" className="w-full bg-cream border border-ink/10 rounded-xl px-4 py-3 text-sm"/></label>
      <label className="space-y-1.5 block"><span className="text-xs tracking-widest uppercase text-ink/70">Message</span><textarea value={form.message} onChange={e=>setForm({...form,message:e.target.value})} rows={3} placeholder="Tell me your vision, location, timing..." className="w-full bg-cream border border-ink/10 rounded-xl px-4 py-3 text-sm resize-y"/></label>
      <label className="flex items-center gap-2 text-sm text-ink/60"><input type="checkbox" checked={form.whatsappOptIn} onChange={e=>setForm({...form,whatsappOptIn:e.target.checked})} className="accent-ink"/> WhatsApp me on +977 {business.whatsapp}</label>

      {msg && <div className={`rounded-xl px-4 py-3 text-sm flex gap-2 ${status==="success" ? "bg-emerald-50 border border-emerald-200 text-emerald-700" : "bg-red-50 border border-red-200 text-red-600"}`}>{status==="success" ? <Check size={16}/> : <AlertCircle size={16}/>}{msg}</div>}

      <button type="submit" disabled={status==="loading"} className="w-full inline-flex justify-center items-center gap-2 bg-ink text-cream py-4 rounded-full font-bold tracking-widest uppercase text-xs hover:bg-charcoal transition disabled:opacity-60">
        {status==="loading" ? "Sending..." : <><Send size={14}/> Send Inquiry</>}
      </button>
      <p className="text-xs text-ink/50 text-center">Direct: {business.phones.join(" • ")} • {business.email} • No spam, secure booking</p>
    </form>
  );
}
