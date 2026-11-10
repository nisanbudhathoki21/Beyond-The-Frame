
// Beyond the Frame — high-resolution photo optimizer.
//
// Originals:
//   photos-raw/<category>/
//
// Generated:
//   public/photos/<category>/
//
// Full photographs retain their original dimensions.
// Thumbnails are resized separately.
// Street and wedding photographs must meet genuine 4K dimensions.
// Original EXIF/GPS metadata is not copied into website images.

import fs from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import exifr from "exifr";

const RAW = "photos-raw";
const OUT = "public/photos";

const CATEGORIES = [
  "streets",
  "vehicles",
  "animals",
  "weddings",
  "mountains",
  "nature",
];

const STRICT_4K_CATEGORIES = new Set(["streets", "weddings"]);

const EXT = new Set([
  ".jpg", ".jpeg", ".png", ".tif", ".tiff", ".webp",
]);

const slug = (s) =>
  s.toLowerCase()
    .replace(/\.[^.]+$/, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "") || "photo";

function fmtShutter(t) {
  if (!t) return undefined;
  return t >= 1 ? `${t}s` : `1/${Math.round(1 / t)}`;
}

function isAtLeast4K(width, height) {
  if (!width || !height) return false;

  if (width >= height) {
    return width >= 3840 && height >= 2160;
  }

  return height >= 3840 && width >= 2160;
}

function resolutionLabel(width, height) {
  const short = Math.min(width, height);
  const long = Math.max(width, height);

  if (long >= 7680 && short >= 4320) return "8K";
  if (isAtLeast4K(width, height)) return "4K";
  return "BELOW 4K";
}

async function readExif(file) {
  try {
    const e = await exifr.parse(file, {
      gps: false,
      tiff: true,
      exif: true,
      ifd1: false,
    });

    if (!e) return undefined;

    const out = {
      camera: [e.Make, e.Model]
        .filter(Boolean)
        .join(" ")
        .replace(/^(Canon) Canon/, "$1") || undefined,
      lens: e.LensModel || undefined,
      focal: e.FocalLength
        ? `${Math.round(e.FocalLength)}mm`
        : undefined,
      aperture: e.FNumber
        ? `f/${Number(e.FNumber).toFixed(1).replace(/\.0$/, "")}`
        : undefined,
      shutter: fmtShutter(e.ExposureTime),
      iso: e.ISO || undefined,
      taken: e.DateTimeOriginal
        ? new Date(e.DateTimeOriginal).toISOString().slice(0, 10)
        : undefined,
    };

    return Object.values(out).some(Boolean) ? out : undefined;
  } catch {
    return undefined;
  }
}

async function exists(file) {
  try {
    await fs.access(file);
    return true;
  } catch {
    return false;
  }
}

const manifestPath = path.join(OUT, "manifest.json");

let manifest = [];

if (await exists(manifestPath)) {
  try {
    manifest = JSON.parse(await fs.readFile(manifestPath, "utf8"));
    if (!Array.isArray(manifest)) manifest = [];
  } catch {
    manifest = [];
  }
}

const byFile = new Map(manifest.map((m) => [m.file, m]));
let added = 0;
let skipped = 0;

for (const cat of CATEGORIES) {
  const dir = path.join(RAW, cat);

  if (!(await exists(dir))) continue;

  const files = (await fs.readdir(dir))
    .filter((f) => EXT.has(path.extname(f).toLowerCase()))
    .sort();

  await fs.mkdir(path.join(OUT, cat), { recursive: true });

  for (const f of files) {
    const src = path.join(dir, f);
    const base = slug(f);

    const file = `photos/${cat}/${base}.webp`;
    const thumb = `photos/${cat}/${base}-thumb.webp`;

    const metadata = await sharp(src, { failOn: "none" }).metadata();

    let width = metadata.width;
    let height = metadata.height;

    // Correct dimensions for EXIF-rotated portrait photographs.
    if ([5, 6, 7, 8].includes(metadata.orientation)) {
      [width, height] = [height, width];
    }

    if (!width || !height) {
      console.log(`SKIPPED: ${f} — unable to read dimensions`);
      skipped++;
      continue;
    }

    if (
      STRICT_4K_CATEGORIES.has(cat) &&
      !isAtLeast4K(width, height)
    ) {
      console.log(
        `REJECTED: ${f} — ${width}x${height}, below 4K requirement`
      );
      skipped++;
      continue;
    }

    const resolution = resolutionLabel(width, height);

    const exif = await readExif(src);

    // Full-resolution WebP. No resizing.
    const full = await sharp(src, { failOn: "none" })
      .rotate()
      .webp({
        quality: 88,
        effort: 6,
        smartSubsample: true,
      })
      .toFile(path.join("public", file));

    // Smaller preview only; original dimensions remain in the full image.
    await sharp(src, { failOn: "none" })
      .rotate()
      .resize({
        width: 900,
        height: 900,
        fit: "inside",
        withoutEnlargement: true,
      })
      .webp({
        quality: 78,
        effort: 5,
      })
      .toFile(path.join("public", thumb));

    const old = byFile.get(file);

    const entry = {
      id: `${cat}-${base}`,
      category: cat,
      file,
      thumb,
      w: full.width,
      h: full.height,
      alt: old?.alt ?? "",
      caption: old?.caption ?? "",
      place: old?.place ?? "",
      exif: exif ?? old?.exif,
      ...(old?.focus ? { focus: old.focus } : {}),
    };

    if (!old) added++;

    byFile.set(file, entry);

    console.log(
      `${old ? "updated" : "added  "} ${file} ` +
      `${full.width}x${full.height} ${resolution} ` +
      `${(full.size / 1024 / 1024).toFixed(2)} MB`
    );
  }
}

const result = [...byFile.values()].sort(
  (a, b) =>
    CATEGORIES.indexOf(a.category) - CATEGORIES.indexOf(b.category) ||
    a.file.localeCompare(b.file)
);

await fs.mkdir(OUT, { recursive: true });

await fs.writeFile(
  manifestPath,
  JSON.stringify(result, null, 2) + "\n"
);

console.log(`\n${result.length} photographs in manifest.`);
console.log(`${added} new photographs; ${skipped} skipped.`);

const missing = result.filter((m) => !m.alt?.trim());

if (missing.length) {
  console.log("\nWrite descriptive alt text for:");

  missing.forEach((m) => console.log(`  - ${m.file}`));
}
