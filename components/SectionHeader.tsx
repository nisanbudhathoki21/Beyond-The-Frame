export default function SectionHeader({ eyebrow, title, subtitle, align="left", goldLine=true }: { eyebrow?: string; title: string; subtitle?: string; align?: "left"|"center"; goldLine?: boolean }) {
  return (
    <div className={`${align==="center" ? "text-center mx-auto max-w-3xl" : "max-w-3xl"} space-y-3`}>
      {eyebrow && <p className="text-gold text-[11px] tracking-[0.18em] uppercase font-semibold">{eyebrow}</p>}
      <h2 className="font-display font-bold text-warm text-[30px] sm:text-[40px] lg:text-[48px] leading-none tracking-tight text-balance">{title}</h2>
      {subtitle && <p className="text-muted text-sm sm:text-base leading-relaxed">{subtitle}</p>}
      {goldLine && <div className={`${align==="center" ? "mx-auto" : ""} h-[2px] w-12 bg-gold mt-4`} />}
    </div>
  );
}
