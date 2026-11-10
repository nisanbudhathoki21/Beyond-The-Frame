import Link from "next/link";
import ScrollStory, { type Scene } from "@/components/ScrollStory";
import { business } from "@/lib/config";
import { getPhotos } from "@/lib/photos";
import type { Photo } from "@/lib/photo-types";
import { asset } from "@/lib/site";
import { allServices } from "@/lib/services";
import { npr } from "@/lib/format";

type Chapter = { cat: string; idx?: number; id: string; title: string; text: string; label: string; side?: "left" | "right" };
const chapters: Chapter[] = [
  { cat: "streets", id: "streets", title: "Streets that never sit still.", text: "Markets, lanes and the people in them.", label: "Streets", side: "right" },
  { cat: "vehicles", id: "roads", title: "Roads, and what crosses them.", text: "Cars, bikes and the highways they own.", label: "Cars and roads" },
  { cat: "animals", id: "animals", title: "Small lives, close up.", text: "Dogs, birds and wildlife, found by waiting.", label: "Animals and birds", side: "right" },
  { cat: "weddings", id: "weddings", title: "The day, and the minutes around it.", text: "Ceremonies, family and the small moments nobody planned.", label: "Weddings" },
  { cat: "mountains", idx: 1, id: "mountains", title: "Hills, light, and the road there.", text: "Prayer flags, rivers and high valleys.", label: "Mountains and travel", side: "right" },
];

export default function Home() {
  const photos = getPhotos();
  const latest = photos.slice(0, 8);
  const from = (id: string) => allServices.find((s) => s.id === id)!;
  const inCat = (c: string) => photos.filter((p) => p.category === c);
  const bg = (p?: Photo) => (p ? { src: asset(p.file), alt: p.alt, focus: p.focus } : undefined);

  const scenes: Scene[] = [
    {
      id: "start", art: "sky", photo: bg(inCat("mountains")[0]),
      title: "Nepal, one frame at a time.",
      text: "Mountains, animals, streets and weddings, shot on a Canon Rebel T7 with an 18–55mm lens. Based in Sunwal.",
      cta: [{ href: "/portfolio/", label: "See the frames", primary: true }, { href: "/contact/", label: "Book a shoot" }],
    },
    // A chapter only appears once you have a real photo for it.
    ...chapters.flatMap((c): Scene[] => {
      const p = inCat(c.cat)[c.idx ?? 0];
      return p ? [{ id: c.id, art: "sky", photo: bg(p), title: c.title, text: c.text, side: c.side, cta: [{ href: `/portfolio/#${c.cat}`, label: c.label }] }] : [];
    }),
    {
      id: "book", art: "dawn", photo: bg(inCat("nature")[0]), tone: "dark", side: "right",
      title: "Have a day worth keeping?",
      text: `Portraits from ${npr(from("individual").priceNPR)}. Weddings from ${npr(from("wedding").priceNPR)}. Final price confirmed before the shoot.`,
      cta: [{ href: "/contact/", label: "Book a shoot", primary: true }, { href: "/services/", label: "See rates" }],
    },
  ];

  return (
    <>
      <ScrollStory scenes={scenes} />

      {latest.length > 0 && (
        <section className="section">
          <div className="wrap">
            <div className="section-head"><h2 className="display">Latest frames</h2></div>
            <div className="strip">
              {latest.map((p) => (
                <Link key={p.id} href={`/portfolio/#${p.category}`} aria-label={p.caption || p.alt || "View in gallery"}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={asset(p.thumb)} width={p.w} height={p.h} alt={p.alt || ""} loading="lazy" decoding="async" />
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      <section className="section">
        <div className="wrap two-col">
          <div>
            <h2 className="display" style={{ fontSize: "var(--s-3)" }}>Honest prices, in NPR</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>Starting rates, confirmed with you before the shoot. Travel beyond Sunwal is quoted separately.</p>
            <p style={{ marginTop: "1.5rem" }}><Link className="btn btn-quiet" href="/services/">See all rates</Link></p>
          </div>
          <ul className="teaser">
            {["individual", "birthday", "wedding"].map((id) => (
              <li key={id}><b>{from(id).title}</b><span>from {npr(from(id).priceNPR)}</span></li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="wrap two-col">
          <div>
            <h2 className="display" style={{ fontSize: "var(--s-3)" }}>The kit</h2>
            <p className="lede" style={{ marginTop: "1rem" }}>An entry-level camera and a kit lens. I work with the light I find and wait for the moment.</p>
          </div>
          <dl className="kit">
            <div><dt>Camera</dt><dd>{business.camera.body}</dd></div>
            <div><dt>Lens</dt><dd>{business.camera.lens}</dd></div>
            <div><dt>Sensor</dt><dd>{business.camera.sensor}</dd></div>
            <div><dt>Focus</dt><dd>{business.camera.focus}</dd></div>
          </dl>
        </div>
      </section>

    </>
  );
}
