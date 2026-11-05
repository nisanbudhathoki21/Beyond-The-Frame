"use client";
import Image from "next/image";
import Link from "next/link";
import { heroImage } from "@/lib/assets";
import { ArrowRight } from "lucide-react";

export default function HeroNew(){
  return (
    <section className="bg-cream pt-[68px]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <div className="grid lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-5 space-y-6">
            <p className="text-gold-dark text-xs tracking-[0.16em] uppercase font-semibold">Nisan Budhathoki • Sunwal, Nepal</p>
            <h1 className="font-display font-bold leading-[0.9] tracking-tight">
              <span className="block text-ink text-4xl sm:text-5xl lg:text-6xl">Real streets.</span>
              <span className="block text-ink/30 text-4xl sm:text-5xl lg:text-6xl">Real people.</span>
              <span className="block text-ink text-4xl sm:text-5xl lg:text-6xl">Real Nepal.</span>
            </h1>
            <p className="text-ink/60 leading-relaxed max-w-md">Street photography, portraits, weddings & travel — shot on my Canon Rebel T7 with natural light. Affordable, honest, and rooted in everyday Nepal.</p>
            <div className="flex flex-wrap gap-3">
              <Link href="/portfolio" className="inline-flex items-center gap-2 bg-ink text-cream px-7 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-charcoal transition">View Portfolio <ArrowRight size={14}/></Link>
              <Link href="/contact" className="inline-flex items-center gap-2 bg-white border border-ink/10 text-ink px-7 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-cream transition">Contact Nisan</Link>
            </div>
            <p className="text-xs text-ink/40">9805432250 • 9763651532 • nisanbudhathoki21@gmail.com</p>
          </div>
          <div className="lg:col-span-7">
            <div className="relative rounded-2xl overflow-hidden border border-ink/10 bg-white shadow-sm">
              <Image src={heroImage.src} alt={heroImage.alt} width={1400} height={900} priority className="w-full h-auto object-cover" />
              <div className="absolute top-4 left-4 bg-cream/90 backdrop-blur px-3 py-1.5 rounded-full border border-ink/10 text-xs font-medium text-ink">📷 Canon T7 • 18-55mm</div>
              <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/50 to-transparent">
                <p className="text-cream text-sm font-medium">{heroImage.caption}</p>
                <p className="text-cream/70 text-xs">{heroImage.location} — Reference photo, replaceable via Admin</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
