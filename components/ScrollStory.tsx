"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Art, { type ArtVariant } from "./Art";
import Viewfinder from "./Viewfinder";

export type Scene = {
  id: string;
  art: ArtVariant;
  photo?: { src: string; alt: string };
  title: string;
  text: string;
  cta?: { href: string; label: string; primary?: boolean }[];
  side?: "left" | "right";
  tone?: "light" | "dark";
};

export default function ScrollStory({ scenes }: { scenes: Scene[] }) {
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const els = refs.current.filter((e): e is HTMLElement => !!e);
    let raf = 0;
    const update = () => {
      raf = 0;
      const vh = window.innerHeight;
      const hdr = parseFloat(getComputedStyle(document.documentElement).fontSize) * 4.5;
      let best = 0, bestD = Infinity;
      els.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const run = r.height - (vh - hdr);
        if (r.bottom > -vh && r.top < 2 * vh) {
          const p = run > 0 ? Math.min(1, Math.max(0, (hdr - r.top) / run)) : 0.5;
          el.style.setProperty("--p", p.toFixed(4));
        }
        const d = Math.abs(r.top + r.height / 2 - vh / 2);
        if (d < bestD) { bestD = d; best = i; }
      });
      setActive(best);
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); if (raf) cancelAnimationFrame(raf); };
  }, []);

  return (
    <div className="story">
      <nav className="dots" aria-label="Story chapters">
        <ol>
          {scenes.map((s, i) => (
            <li key={s.id}>
              <a href={`#${s.id}`} aria-label={s.title} aria-current={i === active ? "true" : undefined} />
            </li>
          ))}
        </ol>
      </nav>
      {scenes.map((s, i) => {
        const H = i === 0 ? "h1" : "h2";
        return (
          <section key={s.id} id={s.id} className="scene" data-tone={s.tone ?? "light"} data-side={s.side ?? "left"} ref={(el) => { refs.current[i] = el; }} style={{ zIndex: i + 1 }} aria-labelledby={`${s.id}-t`}>
            <div className="stage">
              <div className="bg">
                {s.photo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={s.photo.src} alt={s.photo.alt} className="bg-photo" decoding="async" loading={i === 0 ? "eager" : "lazy"} />
                ) : (
                  <Art variant={s.art} />
                )}
              </div>
              <div className="veil" />
              {i === 0 && <Viewfinder />}
              <div className="copy">
                <H id={`${s.id}-t`} className="display">{s.title}</H>
                <p>{s.text}</p>
                {s.cta && (
                  <div className="hero-actions">
                    {s.cta.map((c) => <Link key={c.href} href={c.href} className={`btn ${c.primary ? "btn-primary" : "btn-quiet"}`}>{c.label}</Link>)}
                  </div>
                )}
              </div>
            </div>
          </section>
        );
      })}
    </div>
  );
}
