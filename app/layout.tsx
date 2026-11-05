import "./globals.css";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { business, seo } from "@/lib/config";

const display = Cormorant_Garamond({ subsets: ["latin"], weight: ["400","600","700"], variable: "--font-display", display: "swap" });
const body = Inter({ subsets: ["latin"], variable: "--font-body", display: "swap" });

export const metadata = {
  title: seo.title,
  description: seo.description,
  keywords: seo.keywords,
  metadataBase: new URL(business.siteUrl || "http://localhost:3000"),
  openGraph: { title: seo.title, description: seo.description, type: "website", locale: "en_NP" },
  robots: { index: true, follow: true },
  alternates: { canonical: "/" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        <link rel="preconnect" href="https://images.unsplash.com" />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
          "@context":"https://schema.org",
          "@type":"LocalBusiness",
          name: `Nisan Budhathoki Photography`,
          description: seo.description,
          address: { "@type":"PostalAddress", addressLocality:"Sunwal", addressRegion:"Nawalparasi", addressCountry:"NP"},
          areaServed: business.serviceAreas,
          email: business.email,
          telephone: `+977${business.phones[0]}`,
          priceRange:"NPR 1000-8000",
          url: business.siteUrl
        })}} />
      </head>
      <body className="font-body">
        <a href="#main" className="skip-link">Skip to content</a>
        <Navbar />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
