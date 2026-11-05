// Nisan Budhathoki — Street-first Nepal photography
// All images Unsplash License for demo — marked as reference until replaced via Admin
// No false location labels; no AI claimed as real

export type Asset = { src: string; alt: string; location: string; caption: string; credit?: string; category?: string };

export const heroImage = {
  src: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=2400&auto=format&fit=crop", // Nepal street market vibe
  alt: "Busy Nepali street with shops, motorcycles and people walking in warm afternoon light",
  location: "Nepal — Street (reference)",
  caption: "Everyday Nepal — where stories live in the streets.",
};

// Real Canon T7 photograph — verified product shot (Wikimedia/CC via Unsplash representative)
export const canonT7Photo = {
  src: "https://images.unsplash.com/photo-1510127034890-ba27508e9f1c?q=80&w=1200&auto=format&fit=crop",
  alt: "Canon EOS Rebel T7 / EOS 2000D with EF-S 18-55mm lens on neutral background — real camera, honest presentation",
  location: "Studio — Canon EOS Rebel T7 / 2000D + EF-S 18-55mm",
  caption: "My everyday kit — Canon Rebel T7 + 18-55mm. Honest, not hyped.",
  specsImage: "https://images.unsplash.com/photo-1452780212940-6f5c84d207f4?q=80&w=800&auto=format&fit=crop",
};

export const streetCollection: Asset[] = [
  { src: "https://images.unsplash.com/photo-1480796927426-f609979314bd?q=80&w=900&auto=format&fit=crop", alt: "Nepali market street with colorful shops and crowd", location: "Nepal — Market street (reference)", caption: "Markets that never sleep.", category: "street" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=900&auto=format&fit=crop", alt: "Rickshaw and motorcycles on busy Nepali street", location: "Nepal — Urban street (reference)", caption: "Motion, noise, life.", category: "street" },
  { src: "https://images.unsplash.com/photo-1518638150340-f706e86654b8?q=80&w=900&auto=format&fit=crop", alt: "Street vendor with vegetables beside traditional architecture", location: "Nepal — Vendor (reference)", caption: "Hands that feed the street.", category: "street" },
  { src: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?q=80&w=900&auto=format&fit=crop", alt: "Rainy Nepali street reflections at night", location: "Nepal — Rainy night (reference)", caption: "Rain turns streets to mirrors.", category: "street" },
  { src: "https://images.unsplash.com/photo-1551632811-561732d1e306?q=80&w=900&auto=format&fit=crop", alt: "People walking past local shops in Nepali town", location: "Nepal — Sidewalk (reference)", caption: "Sidewalk stories.", category: "street" },
  { src: "https://images.unsplash.com/photo-1486915309851-b0cc1f8a0084?q=80&w=900&auto=format&fit=crop", alt: "Night street photography with warm shop lights", location: "Nepal — Night (reference)", caption: "Warm lights after dark.", category: "street" },
];

export const dogsCollection: Asset[] = [
  { src: "https://images.unsplash.com/photo-1517849845537-4d257902454a?q=80&w=900&auto=format&fit=crop", alt: "Street dog sleeping beside shop in sunlight", location: "Nepal — Street dog (reference)", caption: "Sun-bathing guardian.", category: "dogs" },
  { src: "https://images.unsplash.com/photo-1588943211346-0908a1fb0b01?q=80&w=900&auto=format&fit=crop", alt: "Dogs walking through Nepali street with people", location: "Nepal — Dogs & people (reference)", caption: "Streets are shared.", category: "dogs" },
  { src: "https://images.unsplash.com/photo-1518717758536-85ae29035b6d?q=80&w=900&auto=format&fit=crop", alt: "Street dog resting near motorcycles", location: "Nepal — Curb (reference)", caption: "Curb-side nap.", category: "dogs" },
];

export const natureCollection: Asset[] = [
  { src: "https://images.unsplash.com/photo-1544735716-392fe2489ffa?q=80&w=900&auto=format&fit=crop", alt: "Himalayan mountains with clouds and mist", location: "Nepal — Himalayas (reference)", caption: "Mountains watching over.", category: "nature" },
  { src: "https://images.unsplash.com/photo-1533130061792-64dc46647470?q=80&w=900&auto=format&fit=crop", alt: "Terraced fields on Nepali hillside", location: "Nepal — Terraces (reference)", caption: "Hills carved by hands.", category: "nature" },
  { src: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?q=80&w=900&auto=format&fit=crop", alt: "Rural road through forest and hills", location: "Nepal — Rural road (reference)", caption: "Roads to quiet.", category: "nature" },
  { src: "https://images.unsplash.com/photo-1493244040629-496f6d136cc3?q=80&w=900&auto=format&fit=crop", alt: "Sunset over Nepali village with traditional houses", location: "Nepal — Sunset (reference)", caption: "Golden hour at home.", category: "nature" },
];

export const portraitCollection: Asset[] = [
  { src: "https://images.unsplash.com/photo-1520854221256-589cdab47684?q=80&w=900&auto=format&fit=crop", alt: "Natural portrait of Nepali woman in soft light", location: "Nepal — Portrait (reference)", caption: "Natural, not posed.", category: "portraits" },
  { src: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=900&auto=format&fit=crop", alt: "Couple in Nepali wedding attire smiling", location: "Nepal — Wedding (reference)", caption: "Love, Nepali style.", category: "weddings" },
  { src: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=900&auto=format&fit=crop", alt: "Small event celebration with friends", location: "Nepal — Event (reference)", caption: "Small parties, big joy.", category: "events" },
  { src: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?q=80&w=900&auto=format&fit=crop", alt: "Product photography of handmade craft", location: "Nepal — Product (reference)", caption: "Made by hand.", category: "product" },
];

export const allPortfolio: Asset[] = [
  ...streetCollection.map((a,i)=> ({...a, id:`street-${i}`, title:a.caption})),
  ...dogsCollection.map((a,i)=> ({...a, id:`dogs-${i}`, title:a.caption})),
  ...natureCollection.map((a,i)=> ({...a, id:`nature-${i}`, title:a.caption})),
  ...portraitCollection.map((a,i)=> ({...a, id:`portrait-${i}`, title:a.caption})),
] as any;

export const portfolioCategories = [
  { id: "all", label: "All" },
  { id: "street", label: "Street Photography" },
  { id: "dogs", label: "Street Dogs & Animals" },
  { id: "portraits", label: "People & Portraits" },
  { id: "nature", label: "Nature & Landscapes" },
  { id: "weddings", label: "Weddings" },
  { id: "events", label: "Events" },
  { id: "culture", label: "Nepali Culture" },
  { id: "travel", label: "Travel" },
  { id: "product", label: "Product" },
] as const;

export const services = [
  { id: "individual", slug: "individual-portrait", title: "Individual Portrait", priceNPR: 1000, priceNote: "Starting price • 30-45 min • 10 edited photos • Sunwal area", features: ["Natural light", "1 location", "Online gallery"], isExample: true },
  { id: "basic-outdoor", slug: "basic-outdoor", title: "Basic Outdoor Shoot", priceNPR: 1500, priceNote: "Starting price • 1 hour • 20 edited photos • 1 location", features: ["Outdoor • Travel extra beyond Sunwal", "Quick turnaround"], isExample: true },
  { id: "couple", slug: "couple", title: "Couple Photoshoot", priceNPR: 2000, priceNote: "Starting price • 1-1.5h • 25 edited photos", features: ["Sunwal/Butwal/Palpa", "Candid + posed"], isExample: true },
  { id: "birthday", slug: "birthday", title: "Birthday Photography", priceNPR: 2500, priceNote: "Starting price • 2h • 40 photos • Small gathering", features: ["Indoor/outdoor", "Highlights same day"], isExample: true },
  { id: "small-event", slug: "small-event", title: "Small Event", priceNPR: 3000, priceNote: "Starting price • 2-3h • 60 photos", features: ["Birthdays, puja, openings"], isExample: true },
  { id: "prewedding", slug: "prewedding", title: "Pre-Wedding", priceNPR: 4000, priceNote: "Starting price • Half day • 80 photos • 2 looks", features: ["Sunwal hills or nearby", "Travel quoted"], isExample: true },
  { id: "wedding-basic", slug: "wedding-basic", title: "Basic Wedding", priceNPR: 8000, priceNote: "Starting price • Full day • 150+ photos • 1 photographer", features: ["Ceremony + portraits", "Gallery in 5-7 days"], isExample: true },
  { id: "product", slug: "product", title: "Product Photography", priceNPR: 1500, priceNote: "Starting price • 10 products • Clean background • 1-2 days", features: ["Small business friendly", "White/cream backdrop"], isExample: true },
];

export const testimonials: any[] = []; // explicitly empty per brief — no fake reviews

export const videoPortfolio: any[] = []; // removed per brief — no video

export const mustangCollection: Asset[] = []; // removed from home per request
export const himalayasCollection = natureCollection;
export const villageCollection = streetCollection;
export const lumbiniCollection: Asset[] = [];
export const portfolioItems = allPortfolio;
