import Link from "next/link";
import ScrollStory, { type Scene } from "@/components/ScrollStory";
import { business } from "@/lib/config";
import { getPhotos } from "@/lib/photos";
import { asset } from "@/lib/site";
import { allServices } from "@/lib/services";
import { npr } from "@/lib/format";

export default function Home() {
  const photos = getPhotos();
  const latest = photos.slice(0, 8);
  const from = (id: string) => allServices.find((s) => s.id === id)!;

  const first = (c: string) => photos.find((p) => p.category === c);
  const bg = (c: string) => { const p = first(c); return p ? { src: asset(p.file), alt: p.alt || `${c} photograph by Nisan Budhathoki` } : undefined; };
  const scenes: Scene[] = [
    { id: "start", art: "sky", photo: bg("mountains"), title: "Nepal, one frame at a time.", text: "Streets, cars, Chitwan wildlife and weddings, shot by Nisan Budhathoki on a Canon Rebel T7 with an 18–55mm lens. Based in Sunwal.", cta: [{ href: "/portfolio/", label: "See the frames", primary: true }, { href: "/contact/", label: "Book a shoot" }] },
    { id: "streets", art: "street", photo: bg("streets"), title: "Streets that never sit still.", text: "Markets, lanes and the people in them.", cta: [{ href: "/portfolio/#streets", label: "Streets" }], side: "right" },
    { id: "roads", art: "road", photo: bg("vehicles"), title: "Roads, and what crosses them.", text: "Cars, bikes and the highways they own.", cta: [{ href: "/portfolio/#vehicles", label: "Cars and roads" }] },
    { id: "chitwan", art: "wild", photo: bg("wildlife"), title: "Quiet mornings in Chitwan.", text: "Animals and birds from the national park, found by waiting.", cta: [{ href: "/portfolio/#wildlife", label: "Wildlife" }], side: "right" },
    { id: "weddings", art: "wedding", photo: bg("weddings"), title: "The day, and the minutes around it.", text: "Ceremonies, family and the small moments nobody planned.", cta: [{ href: "/portfolio/#weddings", label: "Weddings" }] },
    { id: "book", art: "dawn", photo: bg("mountains"), title: "Have a day worth keeping?", text: "Portraits from NPR 1,000. Weddings from NPR 8,000. Final price confirmed before the shoot.", cta: [{ href: "/contact/", label: "Book a shoot", primary: true }, { href: "/services/", label: "See rates" }], side: "right", tone: "dark" },
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
