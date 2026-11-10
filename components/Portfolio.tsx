"use client";
import { useEffect, useMemo, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";
import { categories, exifLine, type CategoryId, type Photo } from "@/lib/photo-types";
import { asset } from "@/lib/site";

type Filter = "all" | CategoryId;
const label = (id: CategoryId) => categories.find((c) => c.id === id)?.label ?? id;
const altOf = (p: Photo) => p.alt || `${label(p.category)} photograph`;

export default function Portfolio({ photos }: { photos: Photo[] }) {
  const [filter, setFilter] = useState<Filter>("all");
  const [open, setOpen] = useState<number | null>(null);
  const dialog = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const id = window.location.hash.slice(1);
    if (categories.some((c) => c.id === id)) setFilter(id as CategoryId);
  }, []);

  const list = useMemo(() => (filter === "all" ? photos : photos.filter((p) => p.category === filter)), [photos, filter]);

  useEffect(() => {
    const d = dialog.current;
    if (!d) return;
    if (open !== null && !d.open) d.showModal();
    if (open === null && d.open) d.close();
  }, [open]);

  const pick = (f: Filter) => {
    setFilter(f);
    window.history.replaceState(null, "", f === "all" ? window.location.pathname : `#${f}`);
  };
  const step = (n: number) => setOpen((i) => (i === null || list.length === 0 ? i : (i + n + list.length) % list.length));
  const current = open !== null ? list[open] : undefined;
  const counts = (id: CategoryId) => photos.filter((p) => p.category === id).length;
  const tilt = (e: React.PointerEvent<HTMLButtonElement>) => {
    if (e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width - 0.5, y = (e.clientY - r.top) / r.height - 0.5;
    e.currentTarget.style.setProperty("--rx", `${(-y * 7).toFixed(2)}deg`);
    e.currentTarget.style.setProperty("--ry", `${(x * 9).toFixed(2)}deg`);
  };
  const untilt = (e: React.PointerEvent<HTMLButtonElement>) => { e.currentTarget.style.setProperty("--rx", "0deg"); e.currentTarget.style.setProperty("--ry", "0deg"); };

  if (photos.length === 0) {
    return <p className="empty">The gallery is being edited. New frames are on their way.</p>;
  }

  return (
    <>
      <div className="filters" role="group" aria-label="Filter photos by subject">
        <button type="button" className="chip" aria-pressed={filter === "all"} onClick={() => pick("all")}>All ({photos.length})</button>
        {categories.filter((c) => counts(c.id) > 0).map((c) => (
          <button key={c.id} type="button" className="chip" aria-pressed={filter === c.id} onClick={() => pick(c.id)}>
            {c.label} ({counts(c.id)})
          </button>
        ))}
      </div>

      <div className="sheet">
        {list.map((p, i) => (
          <button key={p.id} type="button" onPointerMove={tilt} onPointerLeave={untilt} onClick={() => setOpen(i)} aria-label={`Open photo: ${p.caption || altOf(p)}`}>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={asset(p.thumb)} width={p.w} height={p.h} alt={altOf(p)} loading="lazy" decoding="async" />
            {(p.caption || p.place) && <span className="cap">{[p.caption, p.place].filter(Boolean).join(", ")}</span>}
          </button>
        ))}
      </div>

      <dialog
        ref={dialog}
        className="lightbox"
        aria-label="Photo viewer"
        onClose={() => setOpen(null)}
        onKeyDown={(e) => { if (e.key === "ArrowLeft") step(-1); if (e.key === "ArrowRight") step(1); }}
        onClick={(e) => { const c = (e.target as HTMLElement).classList; if (c.contains("lb") || c.contains("lb-img")) setOpen(null); }}
      >
        {current && (
          <div className="lb">
            <div className="lb-img">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={asset(current.file)} width={current.w} height={current.h} alt={altOf(current)} />
            </div>
            <div className="lb-meta">
              <div>
                <p style={{ color: "var(--paper)", fontSize: "1.05rem" }}>{current.caption || label(current.category)}</p>
                <p>{[current.place, `${(open ?? 0) + 1} of ${list.length}`].filter(Boolean).join(" · ")}</p>
                {exifLine(current.exif) && <p className="exif">{exifLine(current.exif)}</p>}
              </div>
              <div className="lb-ctrl">
                <button type="button" className="icon-btn" onClick={() => step(-1)} aria-label="Previous photo"><ChevronLeft aria-hidden="true" /></button>
                <button type="button" className="icon-btn" onClick={() => step(1)} aria-label="Next photo"><ChevronRight aria-hidden="true" /></button>
                <button type="button" className="icon-btn" onClick={() => setOpen(null)} aria-label="Close viewer" autoFocus><X aria-hidden="true" /></button>
              </div>
            </div>
          </div>
        )}
      </dialog>
    </>
  );
}
