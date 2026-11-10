import Link from "next/link";
import { business, navLinks } from "@/lib/config";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="wrap">
        <div className="foot">
          <div>
            <p className="display" style={{ fontSize: "var(--s-2)" }}>{business.name}</p>
            <p className="muted" style={{ marginTop: "0.6rem", maxWidth: "34ch" }}>
              Photography by {business.photographer}. Shot on a Canon Rebel T7, based in {business.base}.
            </p>
          </div>
          <div>
            <h2>Pages</h2>
            <ul>{navLinks.map((l) => <li key={l.href}><Link href={l.href}>{l.label}</Link></li>)}</ul>
          </div>
          <div>
            <h2>Reach me</h2>
            <ul>
              {business.phones.map((p) => <li key={p}><a href={`tel:+977${p}`}>{p}</a></li>)}
              <li><a href={`https://wa.me/977${business.whatsapp}`} target="_blank" rel="noopener noreferrer">WhatsApp</a></li>
              <li><a href={`mailto:${business.email}`}>{business.email}</a></li>
            </ul>
          </div>
        </div>
        <p className="fine">Serving {business.serviceAreas.join(", ")}. © {new Date().getFullYear()} {business.photographer}. All photographs are mine; please ask before using them.</p>
      </div>
    </footer>
  );
}
