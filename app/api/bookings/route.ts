import { NextRequest, NextResponse } from "next/server";
import { bookingSchema, hashIp } from "@/lib/validators";
import { rateLimit, getClientIp } from "@/lib/rate-limit";
import { readJson, writeJson } from "@/lib/db";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`booking:${ip}`, 5, 60 * 60 * 1000); // 5 per hour
  if (!rl.allowed) {
    return NextResponse.json({ error: "Too many bookings. Please try again later." }, { status: 429, headers: { "Retry-After": String(Math.ceil(rl.resetIn/1000)) } });
  }

  let body: unknown;
  try { body = await req.json(); } catch { return NextResponse.json({ error: "Invalid JSON" }, { status: 400 }); }

  const parsed = bookingSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten().fieldErrors }, { status: 400 });
  }

  const data = parsed.data as any;
  // CSRF check (if token present, validate against cookie; lenient for demo but enforced when cookie exists)
  const csrfCookie = req.cookies.get(process.env.CSRF_COOKIE_NAME || "nls_csrf")?.value;
  if (csrfCookie && data.csrfToken && data.csrfToken !== csrfCookie) {
    return NextResponse.json({ error: "CSRF validation failed" }, { status: 403 });
  }

  // Duplicate prevention: same email+date+phone within 24h
  const bookings = readJson<any[]>("bookings", []);
  const now = Date.now();
  const isDup = bookings.some(b => b.email === data.email && b.eventDate === data.eventDate && b.phone === data.phone && (now - new Date(b.createdAt).getTime()) < 24*60*60*1000);
  if (isDup) {
    return NextResponse.json({ error: "Duplicate booking detected — you already have a pending request for this date. Check your email." }, { status: 409 });
  }

  const booking = {
    id: crypto.randomUUID(),
    ...data,
    status: "pending" as const,
    createdAt: new Date().toISOString(),
    ipHash: hashIp(ip),
    sanitizedMessage: data.message ? data.message.replace(/[<>]/g,"").slice(0,2000) : undefined,
  };

  bookings.push(booking);
  writeJson("bookings", bookings);

  // WhatsApp deep link (configurable)
  const wa = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER;
  const waLink = wa ? `https://wa.me/${wa.replace(/[^0-9]/g,"")}?text=${encodeURIComponent(`Hi, I booked ${data.eventType} on ${data.eventDate} at ${data.location}. Name: ${data.name}`)}` : null;

  return NextResponse.json({ message: "Booking received — we'll contact you within hours!", bookingId: booking.id, whatsapp: waLink }, { status: 201 });
}

export async function GET(req: NextRequest) {
  // Admin only — check session cookie
  const token = req.cookies.get(process.env.SESSION_COOKIE_NAME || "nls_session")?.value;
  if (!token) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  const { verifySession } = await import("@/lib/auth");
  const sess = verifySession(token);
  if (!sess) return NextResponse.json({ error: "Invalid session" }, { status: 401 });

  const bookings = readJson<any[]>("bookings", []);
  return NextResponse.json({ bookings: bookings.sort((a,b)=> new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) });
}
