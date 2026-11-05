import Link from "next/link";
import { services } from "@/lib/assets";
import { Check } from "lucide-react";
import { business } from "@/lib/config";
export const metadata = { title: "Services & Pricing — Affordable NPR | Nisan Budhathoki" };
export default function ServicesPage(){
  return (
    <div className="pt-24 pb-12 bg-cream min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        <div className="max-w-2xl">
          <p className="text-gold-dark text-xs tracking-[0.16em] uppercase font-semibold">Services & NPR Pricing</p>
          <h1 className="font-display font-bold text-4xl leading-none tracking-tight mt-1 text-ink">Affordable, honest pricing.</h1>
          <p className="text-ink/60 mt-3">Starting prices in NPR for a growing business — not luxury markups. Final quote depends on time, location, edits. Travel beyond Sunwal extra. Large events = custom quote. No video/drone.</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {services.map(s=>(
            <div key={s.id} className="bg-white border border-ink/10 rounded-2xl p-5 flex flex-col">
              <p className="text-xs tracking-widest uppercase font-bold text-gold-dark">{s.title}</p>
              <p className="text-xl font-bold text-ink mt-1">NPR {s.priceNPR.toLocaleString("en-NP")} <span className="text-xs font-normal border border-ink/10 bg-cream px-2 py-1 rounded-full">from</span></p>
              <p className="text-xs text-ink/60 mt-2">{s.priceNote}</p>
              <ul className="mt-3 space-y-1.5 text-sm text-ink/70">{s.features.map(f=> <li key={f} className="flex gap-2"><Check size={12} className="text-gold-dark mt-1"/>{f}</li>)}</ul>
              <Link href="/contact" className="mt-4 text-center bg-ink text-cream py-2.5 rounded-full text-xs font-bold uppercase">Book</Link>
            </div>
          ))}
        </div>
        <div className="bg-white border border-ink/10 rounded-2xl p-6">
          <h3 className="font-bold text-ink">Good to know</h3>
          <ul className="text-sm text-ink/70 mt-2 space-y-1">
            <li>• Booking confirmed only after direct chat (phone/WhatsApp)</li>
            <li>• Extra edited photos may cost extra — quoted upfront</li>
            <li>• Service areas: {business.serviceAreas.join(" • ")}</li>
            <li>• Manage prices anytime in Admin → Services</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
