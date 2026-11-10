import fs from "node:fs";
import path from "node:path";
import { categories, type Photo } from "./photo-types";

const FILE_RE = /^photos\/[a-z0-9-]+\/[a-z0-9-]+\.webp$/;
const ids = new Set<string>(categories.map((c) => c.id));

function isPhoto(p: any): p is Photo {
  return (
    p && typeof p === "object" &&
    ids.has(p.category) &&
    typeof p.file === "string" && FILE_RE.test(p.file) &&
    typeof p.thumb === "string" && FILE_RE.test(p.thumb) &&
    Number.isFinite(p.w) && Number.isFinite(p.h) && p.w > 0 && p.h > 0 &&
    typeof p.alt === "string" && typeof p.caption === "string" && typeof p.place === "string" &&
    (p.focus === undefined || (typeof p.focus === "string" && /^\d{1,3}% \d{1,3}%$/.test(p.focus)))
  );
}

/** Build-time only: reads public/photos/manifest.json (written by `npm run photos`). */
export function getPhotos(): Photo[] {
  try {
    const raw = fs.readFileSync(path.join(process.cwd(), "public/photos/manifest.json"), "utf8");
    const data = JSON.parse(raw);
    return Array.isArray(data) ? data.filter(isPhoto) : [];
  } catch {
    return [];
  }
}
