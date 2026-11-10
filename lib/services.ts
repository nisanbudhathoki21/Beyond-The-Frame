export type Service = { id: string; title: string; priceNPR: number; detail: string; note?: string };
export type ServiceGroup = { id: string; title: string; items: Service[] };

export const serviceGroups: ServiceGroup[] = [
  {
    id: "portraits",
    title: "Portraits and couples",
    items: [
      { id: "individual", title: "Individual portrait", priceNPR: 1000, detail: "30–45 minutes, 10 edited photos, Sunwal area", note: "Natural light, one location, online gallery" },
      { id: "outdoor", title: "Outdoor shoot", priceNPR: 1500, detail: "1 hour, 20 edited photos, 1 location", note: "Travel is extra beyond Sunwal" },
      { id: "couple", title: "Couple shoot", priceNPR: 2000, detail: "1–1.5 hours, 25 edited photos", note: "Sunwal, Butwal or Palpa. Candid and posed" },
    ],
  },
  {
    id: "events",
    title: "Events",
    items: [
      { id: "birthday", title: "Birthday", priceNPR: 2500, detail: "2 hours, 40 photos, small gathering", note: "Indoor or outdoor. Highlights the same day" },
      { id: "small-event", title: "Small event", priceNPR: 3000, detail: "2–3 hours, 60 photos", note: "Birthdays, puja, openings" },
    ],
  },
  {
    id: "weddings",
    title: "Weddings",
    items: [
      { id: "prewedding", title: "Pre-wedding", priceNPR: 4000, detail: "Half day, 80 photos, 2 looks", note: "Sunwal hills or nearby. Travel quoted separately" },
      { id: "wedding", title: "Wedding", priceNPR: 8000, detail: "Full day, 150+ photos, 1 photographer", note: "Ceremony and portraits. Gallery in 5–7 days" },
    ],
  },
  {
    id: "business",
    title: "Business",
    items: [
      { id: "product", title: "Product photos", priceNPR: 1500, detail: "10 products, clean background, 1–2 days", note: "Good for small shops" },
    ],
  },
];

export const allServices = serviceGroups.flatMap((g) => g.items);
