import Link from "next/link";
import Image from "next/image";
import { business } from "@/lib/config";
import { streetCollection, dogsCollection, natureCollection, services } from "@/lib/assets";
import HeroNew from "@/components/HeroNew";
import CanonSection from "@/components/CanonSection";
import { ArrowRight, Phone, Mail, Check } from "lucide-react";

export default function HomePage() {
  return (
    <>
      <HeroNew />

      {/* Intro */}
      <section className="py-12 bg-cream">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-5">
            <p className="text-gold-dark text-xs tracking-[0.16em] uppercase font-semibold">Who I Am</p>
            <h2 className="font-display font-bold text-3xl leading-tight mt-2 text-ink">I’m Nisan — a growing photographer in Nepal who loves real moments.</h2>
          </div>
          <div className="lg:col-span-7 space-y-4">
            <p className="text-ink/70 leading-relaxed">I’m based in Sunwal, shooting streets, people, small weddings and everyday stories with my Canon Rebel T7. I don’t chase fake perfection — I watch, wait, and capture what feels true.</p>
            <div className="flex flex-wrap gap-2">
              {business.serviceAreas.map(a=> <span key={a} className="text-xs border border-ink/10 bg-white px-3 py-1.5 rounded-full">{a}</span>)}
            </div>
            <Link href="/about" className="inline-flex text-xs tracking-widest uppercase font-bold text-ink border-b border-gold pb-1">More About Me →</Link>
          </div>
        </div>
      </section>

      {/* Selected Portfolio — editorial grid */}
      <section className="py-12 bg-white border-y border-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="flex justify-between items-end gap-4">
            <div>
              <p className="text-gold-dark text-xs tracking-[0.16em] uppercase font-semibold">Selected Work</p>
              <h2 className="font-display font-bold text-3xl mt-1 text-ink">A taste of Nepal.</h2>
              <p className="text-ink/60 text-sm mt-1">Street • Dogs • Nature • Portraits — full portfolio has 9 categories, masonry + lightbox.</p>
            </div>
            <Link href="/portfolio" className="hidden sm:inline-flex items-center gap-2 border border-ink/10 bg-cream px-5 py-2.5 rounded-full text-xs font-bold uppercase">View All <ArrowRight size={14}/></Link>
          </div>
          <div className="grid md:grid-cols-12 gap-4">
            <div className="md:col-span-7 relative rounded-2xl overflow-hidden border border-ink/10 h-[360px]">
              <Image src={streetCollection[0].src} alt={streetCollection[0].alt} fill className="object-cover hover:scale-[1.03] transition duration-700" />
              <span className="absolute top-3 left-3 bg-cream text-ink text-xs px-3 py-1 rounded-full border border-ink/10">Street Photography</span>
            </div>
            <div className="md:col-span-5 grid grid-rows-2 gap-4">
              <div className="relative rounded-2xl overflow-hidden border border-ink/10 h-[172px]">
                <Image src={dogsCollection[0].src} alt={dogsCollection[0].alt} fill className="object-cover" />
                <span className="absolute top-3 left-3 bg-cream text-ink text-xs px-3 py-1 rounded-full">Street Dogs</span>
              </div>
              <div className="relative rounded-2xl overflow-hidden border border-ink/10 h-[172px]">
                <Image src={natureCollection[0].src} alt={natureCollection[0].alt} fill className="object-cover" />
                <span className="absolute top-3 left-3 bg-cream text-ink text-xs px-3 py-1 rounded-full">Nature</span>
              </div>
            </div>
          </div>
          <Link href="/portfolio" className="sm:hidden inline-flex items-center gap-2 bg-ink text-cream px-6 py-3 rounded-full text-xs font-bold uppercase">View Full Portfolio</Link>
        </div>
      </section>

      {/* Canon Real */}
      <CanonSection />

      {/* Services — affordable */}
      <section className="py-12 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
          <div className="max-w-2xl">
            <p className="text-gold-dark text-xs tracking-[0.16em] uppercase font-semibold">Services & Pricing — Affordable for Nepal</p>
            <h2 className="font-display font-bold text-3xl mt-1 text-ink">Simple prices. No surprises.</h2>
            <p className="text-ink/60 text-sm mt-2">Introductory starting prices in NPR. Final quote depends on time, location and edits. Travel beyond Sunwal quoted separately. No video/drone.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {services.map(s=>(
              <div key={s.id} className="bg-cream border border-ink/10 rounded-2xl p-5 flex flex-col">
                <p className="text-xs tracking-widest uppercase font-bold text-gold-dark">{s.title}</p>
                <p className="text-xl font-bold text-ink mt-1">NPR {s.priceNPR.toLocaleString("en-NP")} <span className="text-xs font-normal bg-white border border-ink/10 px-2 py-1 rounded-full">from</span></p>
                <p className="text-xs text-ink/60 mt-2">{s.priceNote}</p>
                <ul className="mt-3 space-y-1.5 text-sm text-ink/70">
                  {s.features.map(f=> <li key={f} className="flex gap-2"><Check size={12} className="text-gold-dark mt-1"/>{f}</li>)}
                </ul>
                <Link href="/contact" className="mt-4 text-center bg-ink text-cream py-2.5 rounded-full text-xs font-bold uppercase">Book</Link>
              </div>
            ))}
          </div>
          <p className="text-xs text-ink/50">* Prices are starting points — confirm via WhatsApp/call before booking. Large events need custom quote.</p>
        </div>
      </section>

      {/* About preview */}
      <section className="py-12 bg-cream border-y border-ink/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5">
            <p className="text-gold-dark text-xs tracking-[0.16em] uppercase font-semibold">About Me</p>
            <h2 className="font-display font-bold text-3xl mt-1 text-ink">Personal, not corporate.</h2>
            <p className="text-ink/70 mt-3 leading-relaxed">I’m Nisan Budhathoki — a growing photographer who loves real light and real stories. I’m learning every day, and I put honesty before hype. No fake awards, no invented clients — just my work.</p>
            <Link href="/about" className="inline-flex mt-4 bg-white border border-ink/10 px-6 py-2.5 rounded-full text-xs font-bold uppercase">Read My Story</Link>
          </div>
          <div className="lg:col-span-7 bg-white border border-ink/10 rounded-2xl p-6">
            <h3 className="font-semibold text-ink">What I focus on</h3>
            <ul className="mt-3 grid sm:grid-cols-2 gap-2 text-sm text-ink/70">
              <li>• Street & everyday life</li><li>• Natural portraits</li><li>• Small weddings & events</li><li>• Travel & landscapes</li><li>• Product (small biz)</li><li>• Respect for people</li>
            </ul>
            <div className="mt-4 flex flex-wrap gap-2">
              <a href={`tel:+977${business.phones[0]}`} className="inline-flex gap-2 items-center bg-ink text-cream px-4 py-2 rounded-full text-xs font-bold"><Phone size={12}/> {business.phones[0]}</a>
              <a href={`mailto:${business.email}`} className="inline-flex gap-2 items-center bg-white border border-ink/10 px-4 py-2 rounded-full text-xs font-bold"><Mail size={12}/> {business.email}</a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="py-12 bg-ink">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-cream rounded-2xl p-6 sm:p-8 flex flex-col lg:flex-row justify-between gap-6 items-start lg:items-center border border-white/10">
            <div>
              <p className="text-gold-dark text-xs tracking-[0.16em] uppercase font-semibold">Ready to shoot?</p>
              <h2 className="font-display font-bold text-2xl text-ink mt-1">Let’s make your moments last.</h2>
              <p className="text-ink/60 text-sm mt-1">Sunwal • Butwal • Palpa • Bardaghat • Nearby areas • WhatsApp +977 {business.whatsapp}</p>
            </div>
            <Link href="/contact" className="bg-ink text-cream px-8 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase">Contact & Book →</Link>
          </div>
        </div>
      </section>
    </>
  );
}
