import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";
import { getPhotos } from "@/lib/photos";

export const metadata: Metadata = { title: "Frames | Beyond the Frame", description: "Mountains, animals, streets, weddings and nature photographs from Nepal." };

export default function Page() {
  return (
    <div className="wrap">
      <div className="page-title">
        <h1 className="display">Frames</h1>
        <p className="lede" style={{ marginTop: "1.25rem" }}>Mountains, animals, streets, cars, weddings and nature. Open a photo to see it full size.</p>
      </div>
      <div style={{ paddingBottom: "5rem" }}><Portfolio photos={getPhotos()} /></div>
    </div>
  );
}
