"use client";
import { useState, useMemo } from "react";
import { portfolioCategories } from "@/lib/assets";
import { MasonryGallery } from "@/components/Gallery";

export default function PortfolioClient({ initialCat, items }: { initialCat: string; items: any[] }){
  const [cat, setCat] = useState(initialCat);
  const filtered = useMemo(()=> cat==="all" ? items : items.filter((it:any)=> it.category===cat), [cat, items]);
  return (
    <div className="space-y-5">
      <div className="flex flex-wrap gap-2">
        {portfolioCategories.map(c=>(
          <button key={c.id} onClick={()=>setCat(c.id)} className={`px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border ${cat===c.id ? "bg-ink text-cream border-ink" : "bg-white text-ink/60 border-ink/10 hover:text-ink"}`}>
            {c.label} {c.id!=="all" ? `(${items.filter((it:any)=>it.category===c.id).length})` : `(${items.length})`}
          </button>
        ))}
      </div>
      <p className="text-xs text-ink/50">{filtered.length} photos • All demo images are reference (Unsplash License) — yours replace them via Admin. No fake location tags.</p>
      <MasonryGallery items={filtered} />
      {filtered.length===0 && <div className="bg-white border border-ink/10 rounded-2xl p-8 text-center"><p className="font-bold text-ink">No photos yet in this category</p><p className="text-sm text-ink/60 mt-1">Upload your Canon T7 shots via Admin → Portfolio. They’ll appear here instantly.</p></div>}
    </div>
  );
}
