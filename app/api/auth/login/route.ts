import { NextRequest, NextResponse } from "next/server";
import { getAdminCredentials, verifyPassword, signSession, sessionCookie } from "@/lib/auth";
import { rateLimit, getClientIp } from "@/lib/rate-limit";

export async function POST(req: NextRequest) {
  const ip = getClientIp(req);
  const rl = rateLimit(`login:${ip}`, 5, 15*60*1000);
  if (!rl.allowed) return NextResponse.json({ error: "Too many attempts. Try again later." }, { status: 429 });

  const { email, password } = await req.json().catch(()=> ({}));
  if (!email || !password) return NextResponse.json({ error: "Email and password required" }, { status: 400 });

  const creds = getAdminCredentials();
  if (email !== creds.email) {
    // timing-safe: still hash-compare to avoid enumeration
    await verifyPassword(password, creds.hash);
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }
  const ok = await verifyPassword(password, creds.hash);
  if (!ok) return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });

  const token = signSession({ email, role: "admin" });
  const res = NextResponse.json({ message: "Logged in", email });
  res.headers.set("Set-Cookie", sessionCookie(token));
  return res;
}
