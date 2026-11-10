export type CategoryId = "streets" | "vehicles" | "animals" | "mountains" | "nature";

export const categories: { id: CategoryId; label: string; blurb: string }[] = [
  { id: "streets", label: "Streets", blurb: "Markets, lanes and the people in them." },
  { id: "vehicles", label: "Cars and roads", blurb: "Cars, bikes and the roads they own." },
  { id: "animals", label: "Animals and birds", blurb: "Dogs, birds and wildlife, found by waiting." },
  { id: "mountains", label: "Mountains and travel", blurb: "Hills, light and the road there." },
  { id: "nature", label: "Nature", blurb: "Trees, gardens and quiet light." },
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
  focus?: string;
};

export const exifLine = (e?: Exif) =>
  e ? [e.focal, e.aperture, e.shutter, e.iso ? `ISO ${e.iso}` : ""].filter(Boolean).join("  ") : "";