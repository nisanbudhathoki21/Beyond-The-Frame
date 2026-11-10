import type { Metadata } from "next";
import Portfolio from "@/components/Portfolio";
import { getPhotos } from "@/lib/photos";

export const metadata: Metadata = { title: "Frames | Beyond the Frame", description: "Street, wildlife, wedding and mountain photographs from Nepal by Nisan Budhathoki." };

export default function Page() {
  return (
    <div className="wrap">
      <div className="page-title">
        <h1 className="display">Frames</h1>
        <p className="lede" style={{ marginTop: "1.25rem" }}>Streets, cars, Chitwan wildlife, weddings and mountains. Open a photo to see the camera settings.</p>
      </div>
      <div style={{ paddingBottom: "5rem" }}><Portfolio photos={getPhotos()} /></div>
    </div>
  );
}
