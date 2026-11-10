import type { Metadata } from "next";
import Link from "next/link";
import { serviceGroups } from "@/lib/services";
import { npr } from "@/lib/format";

export const metadata: Metadata = { title: "Rates | Beyond the Frame", description: "Starting rates in NPR for portraits, couples, events, weddings and product photos in Sunwal, Butwal and Palpa." };

export default function Page() {
  return (
    <div className="wrap" style={{ paddingBottom: "5rem" }}>
      <div className="page-title">
        <h1 className="display">Rates</h1>
        <p className="lede" style={{ marginTop: "1.25rem" }}>These are starting prices in NPR. I confirm the final price with you before the shoot. Travel beyond Sunwal is quoted separately.</p>
      </div>
      {serviceGroups.map((g) => (
        <section className="rate-group" key={g.id} aria-labelledby={`g-${g.id}`}>
          <h2 className="display" id={`g-${g.id}`}>{g.title}</h2>
          <ul>
            {g.items.map((s) => (
              <li className="rate" key={s.id}>
                <h3>{s.title}</h3>
                <p className="detail">{s.detail}</p>
                {s.note && <p className="note">{s.note}</p>}
                <p className="price"><small>from</small>{npr(s.priceNPR)}</p>
              </li>
            ))}
          </ul>
        </section>
      ))}
      <p style={{ marginTop: "3rem" }}><Link className="btn btn-primary" href="/contact/">Book a shoot</Link></p>
    </div>
  );
}
