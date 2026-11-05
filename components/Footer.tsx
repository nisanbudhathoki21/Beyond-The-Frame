import Link from "next/link";
import { Camera, MapPin, Mail, Phone } from "lucide-react";
import { business } from "@/lib/config";
export default function Footer(){
  return (
    <footer className="bg-ink text-cream border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <div className="flex items-center gap-3"><span className="w-9 h-9 rounded-full bg-cream text-ink grid place-items-center"><Camera size={16}/></span><span className="font-display font-bold tracking-wide">NISAN BUDHATHOKI</span></div>
            <p className="text-sm text-cream/60 mt-3 max-w-sm leading-relaxed">Growing photographer in Nepal — street, portrait, wedding, travel. Honest moments, natural light, everyday stories. Canon Rebel T7.</p>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.18em] uppercase font-semibold text-cream/90">Service Areas</h4>
            <ul className="mt-3 space-y-1.5 text-sm text-cream/60">
              {business.serviceAreas.map(a=> <li key={a} className="flex gap-2"><MapPin size={12} className="mt-1 text-gold"/>{a}</li>)}
            </ul>
          </div>
          <div>
            <h4 className="text-xs tracking-[0.18em] uppercase font-semibold text-cream/90">Contact</h4>
            <p className="text-sm text-cream/70 mt-3 flex gap-2"><Phone size={14} className="text-gold mt-0.5"/><a href={`tel:+977${business.phones[0]}`} className="hover:text-cream">{business.phones[0]}</a> • <a href={`tel:+977${business.phones[1]}`} className="hover:text-cream">{business.phones[1]}</a></p>
            <p className="text-sm text-cream/70 flex gap-2 mt-2"><Mail size={14} className="text-gold mt-0.5"/><a href={`mailto:${business.email}`} className="hover:text-cream">{business.email}</a></p>
            <p className="text-xs text-cream/50 mt-2">WhatsApp: +977 {business.whatsapp} • Editable in Admin</p>
            <Link href="/contact" className="inline-flex mt-4 bg-cream text-ink px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase">Contact & Booking</Link>
          </div>
        </div>
        <div className="mt-10 pt-6 border-t border-white/10 flex flex-col sm:flex-row justify-between gap-3 text-xs text-cream/50">
          <p>© {new Date().getFullYear()} Nisan Budhathoki Photography • Sunwal, Nepal • NPR pricing • No fake reviews</p>
          <p><Link href="/admin" className="hover:text-cream">Admin</Link> • Built with care in Nepal</p>
        </div>
      </div>
    </footer>
  );
}
