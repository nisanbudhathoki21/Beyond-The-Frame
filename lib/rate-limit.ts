// Simple in-memory token bucket (suitable for single-instance; use Redis in production cluster)

type Bucket = { tokens: number; last: number };
const buckets = new Map<string, Bucket>();

export function rateLimit(key: string, max: number, windowMs: number): { allowed: boolean; remaining: number; resetIn: number } {
  const now = Date.now();
  let b = buckets.get(key);
  if (!b || now - b.last > windowMs) {
    b = { tokens: max, last: now };
    buckets.set(key, b);
  }
  if (b.tokens <= 0) {
    return { allowed: false, remaining: 0, resetIn: windowMs - (now - b.last) };
  }
  b.tokens -= 1;
  return { allowed: true, remaining: b.tokens, resetIn: windowMs - (now - b.last) };
}

export function getClientIp(req: Request): string {
  const xf = req.headers.get("x-forwarded-for");
  if (xf) return xf.split(",")[0].trim();
  return req.headers.get("x-real-ip") || "unknown";
}
