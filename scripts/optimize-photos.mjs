// Turns your original photos into web-ready files for the site.
//
//   1. Put originals in photos-raw/<category>/  (streets, vehicles, animals, weddings, mountains, nature)
//   2. Run:  npm run photos
//   3. Open public/photos/manifest.json and write real alt text, caption and place for each photo
//   4. git add public/photos && git commit && git push
//
// What it does: auto-rotates, resizes to 2000px (full) and 900px (thumbnail), saves WebP,
// and reads camera settings from the original EXIF. GPS location and all other metadata are
// NOT copied to the web files, so your exact shooting locations stay private.
import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import exifr from "exifr";

const RAW = "photos-raw";
const OUT = "public/photos";
const CATEGORIES = ["streets", "vehicles", "animals", "weddings", "mountains", "nature"];
const EXT = new Set([".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp"]);

const slug = (s) => s.toLowerCase().replace(/\.[^.]+$/, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "") || "photo";

function fmtShutter(t) {
  if (!t) return undefined;
  return t >= 1 ? `${t}s` : `1/${Math.round(1 / t)}`;
}

async function readExif(file) {
  try {
    const e = await exifr.parse(file, { gps: false, tiff: true, exif: true, ifd1: false });
    if (!e) return undefined;
    const out = {
      camera: [e.Make, e.Model].filter(Boolean).join(" ").replace(/^(Canon) Canon/, "$1") || undefined,
      lens: e.LensModel || undefined,
      focal: e.FocalLength ? `${Math.round(e.FocalLength)}mm` : undefined,
      aperture: e.FNumber ? `f/${Number(e.FNumber).toFixed(1).replace(/\.0$/, "")}` : undefined,
      shutter: fmtShutter(e.ExposureTime),
      iso: e.ISO || undefined,
      taken: e.DateTimeOriginal ? new Date(e.DateTimeOriginal).toISOString().slice(0, 10) : undefined,
    };
    return Object.values(out).some(Boolean) ? out : undefined;
  } catch {
    return undefined;
  }
}

async function exists(p) { try { await fs.access(p); return true; } catch { return false; } }

const manifestPath = path.join(OUT, "manifest.json");
let manifest = [];
if (await exists(manifestPath)) {
  try { manifest = JSON.parse(await fs.readFile(manifestPath, "utf8")); } catch { manifest = []; }
}
const byFile = new Map(manifest.map((m) => [m.file, m]));
let added = 0;

for (const cat of CATEGORIES) {
  const dir = path.join(RAW, cat);
  if (!(await exists(dir))) continue;
  const files = (await fs.readdir(dir)).filter((f) => EXT.has(path.extname(f).toLowerCase())).sort();
  await fs.mkdir(path.join(OUT, cat), { recursive: true });
  for (const f of files) {
    const src = path.join(dir, f);
    const base = slug(f);
    const file = `photos/${cat}/${base}.webp`;
    const thumb = `photos/${cat}/${base}-thumb.webp`;
    const exif = await readExif(src);
    const img = sharp(src, { failOn: "none" }).rotate();
    const full = await img.clone().resize({ width: 2000, height: 2000, fit: "inside", withoutEnlargement: true }).webp({ quality: 78 }).toFile(path.join("public", file));
    await img.clone().resize({ width: 900, height: 900, fit: "inside", withoutEnlargement: true }).webp({ quality: 72 }).toFile(path.join("public", thumb));
    const old = byFile.get(file);
    const entry = {
      id: `${cat}-${base}`,
      category: cat,
      file, thumb,
      w: full.width, h: full.height,
      alt: old?.alt ?? "",
      caption: old?.caption ?? "",
      place: old?.place ?? "",
      exif: exif ?? old?.exif,
      ...(old?.focus ? { focus: old.focus } : {}),
    };
    if (!old) added++;
    byFile.set(file, entry);
    console.log(`${old ? "updated" : "added  "} ${file}  ${full.width}x${full.height}  ${(full.size / 1024).toFixed(0)} KB`);
  }
}

const result = [...byFile.values()].sort((a, b) => CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category) || a.file.localeCompare(b.file));
await fs.mkdir(OUT, { recursive: true });
await fs.writeFile(manifestPath, JSON.stringify(result, null, 2) + "\n");
console.log(`\n${result.length} photos in manifest (${added} new).`);
const missing = result.filter((m) => !m.alt.trim());
if (missing.length) {
  console.log(`\nWrite alt text (what a blind visitor needs to know is in the picture) for:`);
  missing.forEach((m) => console.log("  - " + m.file));
}
