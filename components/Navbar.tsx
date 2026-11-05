"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, Camera } from "lucide-react";
import { business, navLinks } from "@/lib/config";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const path = usePathname();
  useEffect(()=>{ const on=()=> setScrolled(window.scrollY>14); window.addEventListener("scroll", on); return()=>window.removeEventListener("scroll", on)},[]);
  const isHome = path==="/";
  return (
    <header className={`fixed top-0 inset-x-0 z-50 transition-all ${scrolled ? "bg-cream/95 backdrop-blur-md border-b border-ink/10 shadow-sm" : isHome ? "bg-transparent border-transparent" : "bg-cream/80 backdrop-blur border-b border-ink/5"}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between h-[68px]">
        <Link href="/" className="flex items-center gap-3">
          <span className="w-9 h-9 rounded-full bg-ink text-cream grid place-items-center"><Camera size={16} /></span>
          <span className="font-display font-bold tracking-wide text-sm">NISAN BUDHATHOKI</span>
          <span className="hidden md:inline text-[11px] tracking-[0.14em] text-muted ml-2 border-l border-ink/10 pl-3">SUNWAL • NEPAL</span>
        </Link>
        <nav className="hidden lg:flex items-center gap-7">
          {navLinks.map(l=>{
            const active = path===l.href;
            return <Link key={l.href} href={l.href} className={`text-xs tracking-[0.16em] uppercase font-medium transition ${active ? "text-ink border-b-2 border-gold pb-1" : "text-ink/60 hover:text-ink"}`}>{l.label}</Link>
          })}
        </nav>
        <div className="hidden lg:flex items-center gap-3">
          <Link href="/contact" className="bg-ink text-cream px-6 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase hover:bg-charcoal transition">Book Now</Link>
        </div>
        <button aria-label="Menu" onClick={()=>setOpen(!open)} className="lg:hidden w-10 h-10 grid place-items-center rounded-full border border-ink/10 bg-cream">
          {open ? <X size={18}/> : <Menu size={18}/>}
        </button>
      </div>
      {open && (
        <div className="lg:hidden bg-cream border-t border-ink/10">
          <div className="px-5 py-6 space-y-1">
            {navLinks.map(l=> <Link key={l.href} href={l.href} onClick={()=>setOpen(false)} className={`block py-3 text-sm tracking-widest uppercase font-medium border-b border-ink/5 ${path===l.href ? "text-ink" : "text-ink/60"}`}>{l.label}</Link>)}
            <Link href="/contact" onClick={()=>setOpen(false)} className="mt-4 inline-flex bg-ink text-cream px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase">Book Your Session</Link>
            <p className="text-xs text-muted mt-3">{business.serviceAreas.join(" • ")}</p>
          </div>
        </div>
      )}
    </header>
  );
}
