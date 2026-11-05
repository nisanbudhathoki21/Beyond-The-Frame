"use client";
import Image from "next/image";
import { useState } from "react";
import { X, ChevronLeft, ChevronRight, MapPin } from "lucide-react";
import type { Asset } from "@/lib/assets";

export function Lightbox({ items, initial, onClose }: { items: Asset[]; initial: number; onClose: ()=>void }){
  const [idx, setIdx]=useState(initial);
  const it = items[idx];
  return (
    <div className="fixed inset-0 z-[70] bg-ink/95 backdrop-blur-sm flex flex-col">
      <div className="flex items-center justify-between px-4 h-14 border-b border-white/10 text-cream">
        <span className="text-xs tracking-widest uppercase">{idx+1} / {items.length} • {it.location}</span>
        <button onClick={onClose} aria-label="Close" className="w-9 h-9 grid place-items-center rounded-full bg-white/10 hover:bg-white/15"><X size={18}/></button>
      </div>
      <div className="flex-1 relative flex items-center justify-center p-2 sm:p-6">
        <button onClick={()=>setIdx(i=> (i-1+items.length)%items.length)} className="hidden sm:grid absolute left-4 w-10 h-10 place-items-center rounded-full bg-white/10 text-white"><ChevronLeft/></button>
        <div className="relative w-full max-w-5xl h-[70vh]"><Image src={it.src} alt={it.alt} fill className="object-contain" sizes="90vw" priority/></div>
        <button onClick={()=>setIdx(i=> (i+1)%items.length)} className="hidden sm:grid absolute right-4 w-10 h-10 place-items-center rounded-full bg-white/10 text-white"><ChevronRight/></button>
      </div>
      <div className="px-4 py-4 bg-cream border-t border-ink/10">
        <p className="text-ink font-medium">{it.caption}</p>
        <p className="text-sm text-ink/60 flex gap-2 mt-1"><MapPin size={14} className="mt-0.5 text-gold-dark"/>{it.location} — {it.alt}</p>
      </div>
    </div>
  );
}

export function MasonryGallery({ items }: { items: (Asset & { id?: string, title?: string })[] }){
  const [open, setOpen]=useState<number|null>(null);
  return (
    <>
      <div className="masonry">
        {items.map((it,i)=>(
          <button key={i} onClick={()=>setOpen(i)} className="group relative w-full text-left overflow-hidden rounded-xl bg-white border border-ink/10">
            <div className="relative aspect-[4/3] overflow-hidden">
              <Image src={it.src} alt={it.alt} fill className="object-cover group-hover:scale-[1.03] transition duration-500" sizes="(max-width:768px) 100vw, 33vw" loading="lazy"/>
              <span className="absolute top-3 left-3 bg-cream text-ink text-xs px-2.5 py-1 rounded-full border border-ink/10">{(it as any).category || "Nepal"}</span>
            </div>
            <div className="p-3">
              <p className="text-ink font-medium text-sm">{it.caption}</p>
              <p className="text-xs text-ink/60 mt-1">{it.location}</p>
            </div>
          </button>
        ))}
      </div>
      {open!==null && <Lightbox items={items} initial={open} onClose={()=>setOpen(null)} />}
    </>
  );
}
