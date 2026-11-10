import type { Metadata } from "next";
import Link from "next/link";
import { business } from "@/lib/config";

export const metadata: Metadata = { title: "About | Beyond the Frame", description: "Nisan Budhathoki is a photographer in Sunwal, Nepal, shooting streets, people, weddings and wildlife on a Canon Rebel T7." };

export default function Page() {
  return (
    <div className="wrap" style={{ paddingBottom: "5rem" }}>
      <div className="page-title">
        <h1 className="display">I’m Nisan.</h1>
      </div>
      <div className="two-col">
        <div className="prose">
          <p>I’m a photographer based in Sunwal, Nepal. I shoot streets, people, weddings and the animals of Chitwan National Park, and I’m still learning.</p>
          <p>I don’t claim awards I haven’t won or clients I haven’t had. I show you what I see through my Canon Rebel T7, and I keep my prices low so everyday people can afford a good photograph.</p>
          <p>I wait for the real moment instead of posing people, and I treat the people in front of my camera with respect.</p>
          <p style={{ marginTop: "1.5rem" }}><Link className="btn btn-primary" href="/contact/">Book a shoot</Link></p>
        </div>
        <div>
          <h2 className="display" style={{ fontSize: "var(--s-2)", marginBottom: "1rem" }}>Kit</h2>
          <dl className="kit">
            <div><dt>Camera</dt><dd>{business.camera.body}</dd></div>
            <div><dt>Lens</dt><dd>{business.camera.lens}</dd></div>
            <div><dt>Sensor</dt><dd>{business.camera.sensor}</dd></div>
            <div><dt>Focus</dt><dd>{business.camera.focus}</dd></div>
          </dl>
          <h2 className="display" style={{ fontSize: "var(--s-2)", margin: "2.5rem 0 1rem" }}>Where I work</h2>
          <p className="muted">{business.serviceAreas.join(", ")}.</p>
        </div>
      </div>
    </div>
  );
}
