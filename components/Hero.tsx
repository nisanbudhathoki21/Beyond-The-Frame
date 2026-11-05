"use client";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { ArrowRight, Play, MapPin, Award, Images } from "lucide-react";
import { business } from "@/lib/config";
import { heroImage } from "@/lib/assets";

const DSLRScene = dynamic(() => import("@/components/DSLRScene"), { ssr: false, loading: () => <div className="w-full h-full grid place-items-center text-muted text-xs">Loading camera…</div> });

export default function Hero({ scrollProgress = 0 }: { scrollProgress?: number }) {
  const [mounted, setMounted] = useState(false);
  useEffect(()=> setMounted(true), []);
  return (
    <section className="relative min-h-[92vh] flex items-center overflow-hidden bg-ink">
      {/* Background Nepal image */}
      <div className="absolute inset-0">
        <Image src={heroImage.src} alt={heroImage.alt} fill priority className="object-cover opacity-[0.62]" sizes="100vw" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/20" />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
        <div className="absolute inset-0 opacity-[0.07]" style={{backgroundImage: `radial-gradient(circle at 1px 1px, #D6B77A 1px, transparent 0)`, backgroundSize: "28px 28px"}} />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-16">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 bg-white/[0.06] border border-white/10 rounded-full px-3 py-1.5 backdrop-blur">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="text-[11px] tracking-[0.14em] uppercase text-warm/90">Now booking • {business.location.primary}</span>
              <span className="hidden sm:inline text-[11px] bg-gold text-ink px-2 py-0.5 rounded-full font-bold">Canon T7 • 18–55mm</span>
            </div>

            <div>
              <p className="text-gold text-xs tracking-[0.2em] uppercase font-semibold mb-3 flex items-center gap-2"><MapPin size={12} /> Sunwal • Butwal • Lumbini • Mustang</p>
              <h1 className="font-display font-bold leading-[0.9] text-balance">
                <span className="block text-warm text-[42px] sm:text-[56px] lg:text-[72px] tracking-tight">NEPAL,</span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-gold via-gold-light to-warm text-[42px] sm:text-[56px] lg:text-[72px] tracking-tight">THROUGH</span>
                <span className="block text-warm text-[42px] sm:text-[56px] lg:text-[72px] tracking-tight flex items-center gap-3">OUR LENS <span className="hidden sm:inline-block h-[2px] w-16 bg-gold align-middle"></span></span>
              </h1>
              <p className="gold-underline mt-6 text-muted text-sm sm:text-base leading-relaxed max-w-xl">Capturing the mountains, people, culture and beautiful moments of Nepal. Documentary honesty, cinematic craft.</p>
            </div>

            <div className="flex flex-wrap gap-3 pt-1">
              <Link href="/portfolio" className="inline-flex items-center gap-2 bg-gold text-ink px-7 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-gold-light transition">
                Explore Our Photography <ArrowRight size={16} />
              </Link>
              <Link href="/booking" className="inline-flex items-center gap-2 bg-white text-ink px-7 py-3.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-warm transition">
                Book Your Session
              </Link>
              <Link href="/cinematography" className="inline-flex items-center gap-2 border border-white/15 text-warm px-6 py-3.5 rounded-full text-xs font-semibold tracking-widest uppercase hover:bg-white/5 transition">
                <Play size={14} /> Showreel
              </Link>
            </div>

            <div className="flex flex-wrap gap-6 pt-2 text-xs">
              <span className="flex items-center gap-2 text-warm/80"><Award size={14} className="text-gold" />Est. Sunwal, Nawalparasi</span>
              <span className="flex items-center gap-2 text-warm/80"><Images size={14} className="text-gold" />500+ stories told</span>
              <span className="flex items-center gap-2 text-warm/80"><MapPin size={14} className="text-gold" />All Nepal by arrangement</span>
            </div>

            <p className="text-[11px] text-muted/70 max-w-xl leading-relaxed border-l-2 border-gold/30 pl-3">
              {heroImage.caption} Location: {heroImage.location}. All hero images are replaceable via Admin — upload your own Canon Rebel T7 shots.
            </p>
          </div>

          {/* 3D Camera */}
          <div className="relative h-[420px] sm:h-[520px] lg:h-[640px] w-full select-none">
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-ink/40 pointer-events-none z-10 rounded-2xl" />
            <div className="w-full h-full">
              {mounted ? <DSLRScene progress={scrollProgress} /> : <div className="w-full h-full grid place-items-center text-muted">Loading 3D…</div>}
            </div>

            {/* Floating info cards */}
            <div className="absolute top-6 right-2 sm:right-6 bg-charcoal/80 backdrop-blur border border-white/10 rounded-xl px-4 py-3 shadow-xl z-20">
              <p className="text-[11px] tracking-widest uppercase text-gold font-semibold">Now Shooting</p>
              <p className="text-sm font-medium text-warm">Mustang • Annapurna</p>
              <p className="text-xs text-muted">Available for bookings</p>
            </div>
            <div className="absolute bottom-10 left-2 sm:left-6 bg-warm text-ink rounded-xl px-4 py-3 shadow-xl z-20 flex items-center gap-3">
              <span className="w-10 h-10 rounded-full bg-ink text-gold grid place-items-center">◐</span>
              <div>
                <p className="text-xs font-bold tracking-widest uppercase">Canon Rebel T7</p>
                <p className="text-xs text-ink/70">EF-S 18–55mm • Natural light</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-muted">
        <span className="text-[10px] tracking-[0.2em] uppercase">Scroll to explore</span>
        <span className="w-[1px] h-10 bg-gradient-to-b from-gold to-transparent" />
      </div>
    </section>
  );
}
