import Image from "next/image";
import { business } from "@/lib/config";
import { canonT7Photo } from "@/lib/assets";
import { Aperture, Camera, Sun } from "lucide-react";

export default function CanonSection(){
  return (
    <section className="py-16 bg-cream border-y border-ink/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <p className="text-gold-dark text-xs tracking-[0.18em] uppercase font-semibold">My Real Camera</p>
            <h2 className="font-display font-bold text-3xl sm:text-4xl leading-none tracking-tight mt-2 text-ink">Canon EOS Rebel T7<br/><span className="text-ink/60">My everyday eye.</span></h2>
            <p className="text-ink/60 mt-4 leading-relaxed">No fake gear claims. This is my current kit — honest, affordable, and enough to tell real stories. I shoot what I see, with what I have, and I let the light do the work.</p>

            <div className="mt-6 grid sm:grid-cols-2 gap-3">
              <div className="bg-white border border-ink/10 rounded-xl p-4">
                <h3 className="text-xs tracking-widest uppercase font-bold text-ink flex gap-2 items-center"><Camera size={14} className="text-gold"/>{business.equipment.camera.name}</h3>
                <ul className="mt-2 space-y-1 text-sm text-ink/70">
                  <li>• {business.equipment.camera.sensor}</li>
                  <li>• {business.equipment.camera.processor}</li>
                  <li>• {business.equipment.camera.autofocus} • {business.equipment.camera.viewfinder}</li>
                  <li>• {business.equipment.camera.video}</li>
                </ul>
              </div>
              <div className="bg-white border border-ink/10 rounded-xl p-4">
                <h3 className="text-xs tracking-widest uppercase font-bold text-ink flex gap-2 items-center"><Aperture size={14} className="text-gold"/>{business.equipment.lens.name}</h3>
                <ul className="mt-2 space-y-1 text-sm text-ink/70">
                  <li>• {business.equipment.lens.type}</li>
                  <li>• {business.equipment.lens.use}</li>
                  <li>• Versatile 18-55mm zoom</li>
                  <li className="text-gold-dark font-medium">Real lens, real photos</li>
                </ul>
              </div>
            </div>

            <div className="mt-6 bg-ink text-cream rounded-xl p-4 flex gap-3">
              <Sun size={16} className="text-gold mt-1"/>
              <p className="text-sm text-cream/80 leading-relaxed"><strong className="text-cream">Approach:</strong> Observe before capturing • Respect people • Chase natural light • Keep it honest. No over-editing, no fake bokeh, no AI upscaling claimed as optical.</p>
            </div>
          </div>

          <div className="order-1 lg:order-2">
            <div className="relative rounded-2xl overflow-hidden border border-ink/10 bg-white shadow-sm">
              <Image src={canonT7Photo.src} alt={canonT7Photo.alt} width={800} height={600} className="w-full h-auto object-cover" priority />
              <div className="absolute bottom-0 inset-x-0 p-3 bg-gradient-to-t from-black/60 to-transparent">
                <p className="text-cream text-xs">{canonT7Photo.caption} — Verified product photo (replace with your own T7 shot in Admin)</p>
              </div>
            </div>
            <p className="text-xs text-ink/50 mt-2">📷 Real Canon T7 — not a 3D render. Photo credit: representative licensed image. Upload your own camera photo via Admin → About.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
