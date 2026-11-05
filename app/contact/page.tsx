import { business } from "@/lib/config";
import BookingForm from "@/components/BookingForm";
import { Phone, Mail, MapPin } from "lucide-react";
export const metadata = { title: "Contact — Nisan Budhathoki, Sunwal Nepal" };
export default function ContactPage(){
  return (
    <div className="pt-24 pb-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5 space-y-6">
          <div>
            <p className="text-gold-dark text-xs tracking-[0.16em] uppercase font-semibold">Contact</p>
            <h1 className="font-display font-bold text-4xl leading-none tracking-tight mt-1 text-ink">Let’s talk photos.</h1>
            <p className="text-ink/60 mt-3">Personal, friendly, affordable. Tell me your idea and I’ll quote honestly.</p>
          </div>
          <div className="bg-white border border-ink/10 rounded-2xl p-5 space-y-3">
            <p className="font-bold text-ink flex gap-2 items-center"><Phone size={14} className="text-gold-dark"/> Call / WhatsApp</p>
            {business.phones.map(p=> <a key={p} href={`tel:+977${p}`} className="block text-sm text-ink hover:text-gold-dark font-medium">{p} — click to call</a>)}
            <p className="text-xs text-ink/50">WhatsApp: +977 {business.whatsapp} — tap to chat after booking</p>
          </div>
          <div className="bg-white border border-ink/10 rounded-2xl p-5 space-y-2">
            <p className="font-bold text-ink flex gap-2 items-center"><Mail size={14} className="text-gold-dark"/> Email</p>
            <a href={`mailto:${business.email}`} className="text-sm text-ink hover:text-gold-dark">{business.email}</a>
            <p className="text-sm text-ink/60 flex gap-2"><MapPin size={14} className="text-gold-dark mt-0.5"/>{business.location.primary} • Areas: {business.serviceAreas.join(" • ")}</p>
          </div>
        </div>
        <div className="lg:col-span-7">
          <BookingForm />
        </div>
      </div>
    </div>
  );
}
