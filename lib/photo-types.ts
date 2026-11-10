export type CategoryId = "streets" | "vehicles" | "wildlife" | "weddings" | "mountains";

export const categories: { id: CategoryId; label: string; blurb: string }[] = [
  { id: "streets", label: "Streets", blurb: "Markets, lanes and the people in them." },
  { id: "vehicles", label: "Cars and roads", blurb: "Cars, bikes and the roads they own." },
  { id: "wildlife", label: "Chitwan wildlife", blurb: "Animals and birds from Chitwan National Park." },
  { id: "weddings", label: "Weddings", blurb: "Ceremonies and the quiet moments around them." },
  { id: "mountains", label: "Mountains and travel", blurb: "Hills, light and the road there." },
];

export type Exif = {
  camera?: string;
  lens?: string;
  focal?: string;
  aperture?: string;
  shutter?: string;
  iso?: number;
  taken?: string;
};

export type Photo = {
  id: string;
  category: CategoryId;
  file: string;
  thumb: string;
  w: number;
  h: number;
  alt: string;
  caption: string;
  place: string;
  exif?: Exif;
};

export const exifLine = (e?: Exif) =>
  e ? [e.focal, e.aperture, e.shutter, e.iso ? `ISO ${e.iso}` : ""].filter(Boolean).join("  ") : "";
