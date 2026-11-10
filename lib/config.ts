export const business = {
  name: "Beyond the Frame",
  tagline: "Photography in Sunwal, Nepal",
  whatsapp: "9805432250",
  phones: ["9805432250", "9763651532"],
  email: "nisanbudhathoki21@gmail.com",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://nisanbudhathoki21.github.io/Beyond-The-Frame",
  base: "Sunwal, Nawalparasi, Nepal",
  serviceAreas: ["Sunwal", "Butwal", "Palpa", "Khairene", "Bardaghat", "Bhumahi", "nearby areas"],
  camera: {
    body: "Canon EOS Rebel T7 (EOS 2000D)",
    sensor: "24.1 MP APS-C CMOS",
    focus: "9-point autofocus",
    lens: "Canon EF-S 18–55mm f/3.5–5.6 IS II",
  },
};

export const navLinks = [
  { href: "/portfolio/", label: "Frames" },
  { href: "/services/", label: "Rates" },
  { href: "/about/", label: "About" },
  { href: "/contact/", label: "Contact" },
];

export const seo = {
  title: "Beyond the Frame | Photography in Sunwal, Nepal",
  description:
    "Photography from Nepal: mountains, animals, streets, weddings and travel. Shot on a Canon Rebel T7. Based in Sunwal, serving Butwal, Palpa and nearby areas, with rates in NPR.",
};
