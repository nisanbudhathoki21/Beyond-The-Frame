import Image from "next/image";
import { business } from "@/lib/config";
import { canonT7Photo } from "@/lib/assets";
export const metadata = { title: "About — Nisan Budhathoki Photography, Sunwal Nepal" };
export default function AboutPage(){
  return (
    <div className="bg-cream">
      <section className="pt-24 pb-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="text-gold-dark text-xs tracking-[0.16em] uppercase font-semibold">About Me</p>
        <h1 className="font-display font-bold text-4xl sm:text-5xl leading-none tracking-tight mt-2 text-ink">Hi, I’m Nisan Budhathoki.</h1>
        <p className="text-ink/70 leading-relaxed mt-4">I’m a growing photographer based in Sunwal, Nepal. I love capturing real moments — streets, people, dogs, hills, small weddings, everyday life. I’m still learning, and I’m honest about it. I don’t claim awards I haven’t won or clients I haven’t had. I just show you what I see through my Canon Rebel T7.</p>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid lg:grid-cols-2 gap-8 pb-12">
        <div className="bg-white border border-ink/10 rounded-2xl p-6">
          <h2 className="font-display font-bold text-xl text-ink">My approach</h2>
          <ul className="mt-3 space-y-2 text-sm text-ink/70">
            <li>• Observe before capturing</li>
            <li>• Natural moments over posing</li>
            <li>• Respect for people being photographed</li>
            <li>• Attention to light & composition</li>
            <li>• Authentic stories, not filters</li>
            <li>• Prioritize emotion & quality</li>
          </ul>
          <div className="mt-6 p-4 bg-cream border border-ink/10 rounded-xl">
            <p className="text-xs tracking-widest uppercase font-bold text-ink">No invented history</p>
            <p className="text-sm text-ink/60 mt-1">I’m not a luxury studio. I offer affordable, friendly service for everyday Nepalis — portraits for NPR 1,000, birthdays from NPR 2,500, weddings from NPR 8,000. Final price always confirmed before shooting.</p>
          </div>
        </div>
        <div className="space-y-4">
          <div className="bg-white border border-ink/10 rounded-2xl p-6">
            <h3 className="font-bold text-ink">My Camera</h3>
            <p className="text-sm text-ink/70 mt-1">{business.equipment.camera.name} — {business.equipment.camera.sensor}, {business.equipment.camera.processor}, {business.equipment.camera.autofocus}, {business.equipment.camera.viewfinder}. {business.equipment.camera.video}.</p>
            <Image src={canonT7Photo.src} alt={canonT7Photo.alt} width={800} height={500} className="w-full h-auto rounded-xl mt-4 border border-ink/10" />
            <p className="text-xs text-ink/50 mt-2">Real Canon T7 photo — not a 3D fake. Replace with your own camera shot in Admin if you upload one.</p>
          </div>
          <div className="bg-white border border-ink/10 rounded-2xl p-6">
            <h3 className="font-bold text-ink">My Lens</h3>
            <p className="text-sm text-ink/70 mt-1">{business.equipment.lens.name} — {business.equipment.lens.type}. {business.equipment.lens.use}. My current everyday lens; I’m open about not owning expensive pro glass yet.</p>
          </div>
        </div>
      </section>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-12">
        <div className="bg-ink text-cream rounded-2xl p-6">
          <h3 className="font-bold">Contact</h3>
          <p className="text-sm text-cream/70 mt-1">{business.phones.join(" • ")} • {business.email} • {business.serviceAreas.join(" • ")}</p>
          <p className="text-xs text-cream/50 mt-2">Editable in Admin — no fake social links. WhatsApp via +977 {business.whatsapp}</p>
        </div>
      </section>
    </div>
  );
}
