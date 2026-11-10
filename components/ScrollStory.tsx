"use client";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import Art, { type ArtVariant } from "./Art";
import Viewfinder from "./Viewfinder";

export type Scene = {
  id: string;
  art: ArtVariant;
  photo?: { src: string; alt: string; focus?: string };
  title: string;
  text: string;
  cta?: { href: string; label: string; primary?: boolean }[];
  side?: "left" | "right";
  tone?: "light" | "dark";
};

const clamp = (n: number) => Math.min(1, Math.max(0, n));

export default function ScrollStory({ scenes }: { scenes: Scene[] }) {
  const root = useRef<HTMLDivElement>(null);
  const refs = useRef<(HTMLElement | null)[]>([]);
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const rootEl = root.current;
    if (!rootEl) return;
    const els = refs.current.filter((e): e is HTMLElement => !!e);
    // target = where the scroll position says each scene should be; cur eases toward it for a smooth, inertial feel.
    const target = els.map(() => ({ p: 0, e: 1 }));
    const cur = els.map(() => ({ p: 0, e: 1, init: false }));
    const mouse = { tx: 0, ty: 0, x: 0, y: 0 };
    let raf = 0;

    const measure = () => {
      const vh = window.innerHeight;
      const hdr = parseFloat(getComputedStyle(document.documentElement).fontSize) * 4.5;
      let best = 0, bestD = Infinity;
      els.forEach((el, i) => {
        const r = el.getBoundingClientRect();
        const run = r.height - (vh - hdr);
        target[i] = {
          p: run > 0 ? clamp((hdr - r.top) / run) : 0.5,
          e: clamp(1 - (r.top - hdr) / (vh - hdr)),
        };
        const d = Math.abs(r.top + r.height / 2 - vh / 2);
        if (d < bestD) { bestD = d; best = i; }
      });
      setActive(best);
    };

    const tick = () => {
      raf = 0;
      let moving = false;
      els.forEach((el, i) => {
        const t = target[i], c = cur[i];
        const dp = t.p - c.p, de = t.e - c.e;
        if (!c.init || Math.abs(dp) > 0.0004 || Math.abs(de) > 0.0004) {
          c.p = c.init ? c.p + dp * 0.14 : t.p;
          c.e = c.init ? c.e + de * 0.14 : t.e;
          c.init = true;
          el.style.setProperty("--p", c.p.toFixed(4));
          el.style.setProperty("--e", c.e.toFixed(4));
          moving = true;
        }
      });
      const dx = mouse.tx - mouse.x, dy = mouse.ty - mouse.y;
      if (Math.abs(dx) > 0.001 || Math.abs(dy) > 0.001) {
        mouse.x += dx * 0.08; mouse.y += dy * 0.08;
        rootEl.style.setProperty("--mx", mouse.x.toFixed(4));
        rootEl.style.setProperty("--my", mouse.y.toFixed(4));
        moving = true;
      }
      if (moving) raf = requestAnimationFrame(tick);
    };
    const kick = () => { if (!raf) raf = requestAnimationFrame(tick); };
    const onScroll = () => { measure(); kick(); };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mouse.tx = (e.clientX / window.innerWidth - 0.5) * 2;
      mouse.ty = (e.clientY / window.innerHeight - 0.5) * 2;
      kick();
    };

    measure();
    kick();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div className="story" ref={root}>
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
                  <img src={s.photo.src} alt={s.photo.alt} className="bg-photo" style={s.photo.focus ? { objectPosition: s.photo.focus } : undefined} decoding="async" loading={i === 0 ? "eager" : "lazy"} />
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
