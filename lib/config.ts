export const business = {
  name: "Nisan Budhathoki Photography",
  tagline: "Nepal — Real Moments, Real Light",
  photographer: "Nisan Budhathoki",
  currency: "NPR",
  locale: process.env.NEXT_PUBLIC_DEFAULT_LOCALE || "en",
  whatsapp: "9805432250",
  phones: ["9805432250", "9763651532"],
  email: "nisanbudhathoki21@gmail.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000",
  serviceAreas: ["Sunwal", "Butwal", "Palpa", "Khairene", "Bardaghat", "Bhumahi", "Nearby areas"],
  location: {
    primary: "Sunwal, Nawalparasi, Nepal",
    coords: { lat: 27.5739, lng: 83.5575 },
  },
  equipment: {
    camera: {
      name: "Canon EOS Rebel T7 / EOS 2000D",
      sensor: "24.1-megapixel APS-C CMOS",
      processor: "DIGIC 4+",
      autofocus: "9-point AF",
      viewfinder: "Optical viewfinder",
      video: "Full HD (spec only — not offered as service)",
    },
    lens: {
      name: "Canon EF-S 18–55mm f/3.5-5.6 IS II",
      type: "Standard zoom",
      use: "Everyday, portraits, travel, street",
    },
  },
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/about", label: "About" },
  { href: "/services", label: "Services" },
  { href: "/contact", label: "Contact" },
];

export const seo = {
  title: `Nisan Budhathoki — Nepal Street & Portrait Photography | Sunwal • Butwal • Palpa`,
  description: "Nisan Budhathoki — growing photographer in Nepal. Street photography, portraits, weddings, travel and landscapes with a Canon EOS Rebel T7. Based in Sunwal, serving Butwal, Palpa, Bardaghat and nearby areas. Affordable NPR pricing.",
  keywords: ["Nisan Budhathoki", "photographer Sunwal", "photographer Butwal", "Palpa photographer", "Nepal street photography", "Nawalparasi photographer", "affordable wedding photographer Nepal"],
};
