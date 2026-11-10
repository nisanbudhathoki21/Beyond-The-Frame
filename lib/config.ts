
export const business = {
  name: "Beyond the Frame",
  tagline: "Photography | Stories | Perspectives",

  whatsapp: "9805432250",
  phones: ["9805432250", "9763651532"],
  email: "nisanbudhathoki21@gmail.com",

  siteUrl:
    process.env.NEXT_PUBLIC_SITE_URL ||
    "https://nisanbudhathoki21.github.io/Beyond-The-Frame",

  base: "Sunwal, Nawalparasi, Nepal",

  serviceAreas: [
    "Sunwal",
    "Butwal",
    "Palpa",
    "Khairene",
    "Bardaghat",
    "Bhumahi",
    "nearby areas",
  ],

  camera: {
    body: "Canon EOS Rebel T7 (EOS 2000D)",
    sensor: "24.1 MP APS-C CMOS",
    focus: "9-point autofocus",
    lens: "Canon EF-S 18-55mm f/3.5-5.6 IS II",
    filter: "58mm ND filter",
  },
};

export const navLinks = [
  { href: "/portfolio/", label: "Portfolio" },
  { href: "/services/", label: "Services" },
  { href: "/about/", label: "Our Story" },
  { href: "/contact/", label: "Contact" },
];

export const seo = {
  title: "Beyond the Frame | Photography & Visual Stories",
  description:
    "Discover photography and visual storytelling from Nepal. Explore portraits, weddings, landscapes, wildlife, street photography and creative work.",
};
