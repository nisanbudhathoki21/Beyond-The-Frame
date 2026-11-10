import "./globals.css";
import type { Metadata, Viewport } from "next";
import { Instrument_Serif, Manrope } from "next/font/google";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { business, seo } from "@/lib/config";

const display = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--f-display", display: "swap" });
const body = Manrope({ subsets: ["latin"], variable: "--f-body", display: "swap" });

export const metadata: Metadata = {
  title: seo.title,
  description: seo.description,
  metadataBase: new URL(business.siteUrl.replace(/\/?$/, "/")),
  openGraph: { title: seo.title, description: seo.description, type: "website", locale: "en_NP", siteName: business.name },
  robots: { index: true, follow: true },
};
export const viewport: Viewport = { themeColor: "#100e0d", width: "device-width", initialScale: 1 };

// GitHub Pages cannot send security headers, so the policy is set with a meta tag in production.
// 'unsafe-inline' is needed for Next's static hydration scripts; everything else stays on this origin.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline'",
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self' data:",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "upgrade-insecure-requests",
].join("; ");

const jsonLd = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  name: business.name,
  description: seo.description,
  url: business.siteUrl,
  email: business.email,
  telephone: `+977${business.phones[0]}`,
  address: { "@type": "PostalAddress", addressLocality: "Sunwal", addressRegion: "Nawalparasi", addressCountry: "NP" },
  areaServed: business.serviceAreas,
}).replace(/</g, "\\u003c");

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable}`}>
      <head>
        {process.env.NODE_ENV === "production" && <meta httpEquiv="Content-Security-Policy" content={csp} />}
        <meta name="referrer" content="strict-origin-when-cross-origin" />
      </head>
      <body>
        <a className="skip-link" href="#main">Skip to content</a>
        <Header />
        <main id="main">{children}</main>
        <Footer />
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: jsonLd }} />
      </body>
    </html>
  );
}
