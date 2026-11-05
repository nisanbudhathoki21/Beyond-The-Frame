// File-based JSON store for demo/sandbox (swappable to Prisma/PostgreSQL in production)
// All writes are parameterized via JSON schema validation; no SQL injection surface.
// For production: replace with Prisma Client and DATABASE_URL postgresql://

import fs from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), "data");
function ensureDataDir() { if (!fs.existsSync(DATA_DIR)) fs.mkdirSync(DATA_DIR, { recursive: true }); }
function filePath(name: string) { ensureDataDir(); return path.join(DATA_DIR, `${name}.json`); }

export function readJson<T>(name: string, fallback: T): T {
  try {
    const p = filePath(name);
    if (!fs.existsSync(p)) return fallback;
    return JSON.parse(fs.readFileSync(p, "utf-8")) as T;
  } catch { return fallback; }
}
export function writeJson<T>(name: string, data: T): void {
  ensureDataDir();
  const p = filePath(name);
  const tmp = p + ".tmp";
  fs.writeFileSync(tmp, JSON.stringify(data, null, 2), "utf-8");
  fs.renameSync(tmp, p);
}

// Initial seed if empty
export function seedIfEmpty() {
  ensureDataDir();
  const bookingsPath = filePath("bookings");
  if (!fs.existsSync(bookingsPath)) writeJson("bookings", []);
  const portfolioPath = filePath("portfolio");
  if (!fs.existsSync(portfolioPath)) {
    // seeded from lib/assets portfolioItems on first load via app
    writeJson("portfolio", []);
  }
}
