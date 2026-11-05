import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "dev-secret-replace-in-production-64-chars-min-please-change-me-12345";
const COOKIE_NAME = process.env.SESSION_COOKIE_NAME || "nls_session";

// In production, store in DB. For demo, env-based single admin with hashed password.
// Default password: admin123 — change immediately via ADMIN_PASSWORD_HASH env.
const ADMIN_EMAIL = process.env.ADMIN_EMAIL || "admin@nepallens.local";
// Pre-hashed admin123 with bcrypt 12
const DEFAULT_HASH = "$2a$12$IrAt8bj0v2tTed0bptC/f.MWXjykZYqBcX1LPYQvciZPl67claDb."; // admin123

export async function hashPassword(password: string) { return bcrypt.hash(password, 12); }
export async function verifyPassword(password: string, hash: string) { return bcrypt.compare(password, hash); }

export function getAdminCredentials() {
  // Allow ADMIN_PASSWORD_HASH env override; fallback to default hash
  const hash = process.env.ADMIN_PASSWORD_HASH || DEFAULT_HASH;
  return { email: ADMIN_EMAIL, hash };
}

export function signSession(payload: { email: string; role: string }) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: "2h", issuer: "nls" });
}
export function verifySession(token: string): { email: string; role: string } | null {
  try { return jwt.verify(token, JWT_SECRET, { issuer: "nls" }) as any; } catch { return null; }
}
export function sessionCookie(token: string) {
  return `${COOKIE_NAME}=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=7200; ${process.env.NODE_ENV === "production" ? "Secure;" : ""}`;
}
export function clearSessionCookie() {
  return `${COOKIE_NAME}=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0; ${process.env.NODE_ENV === "production" ? "Secure;" : ""}`;
}
export function generateCsrfToken() {
  return [...Array(32)].map(()=> Math.random().toString(36)[2]).join("");
}
