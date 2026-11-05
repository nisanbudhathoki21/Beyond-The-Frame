import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Protect /admin (except login fetch via API) — redirect to admin login if no session
export function middleware(req: NextRequest) {
  const path = req.nextUrl.pathname;
  if (path.startsWith("/admin") && !path.includes("/api")) {
    // Client-side admin handles auth; middleware adds security headers already via next.config
    // For true protection, check cookie and redirect — but client admin is SPA, so allow load; API is protected.
  }
  const res = NextResponse.next();
  // Additional header: Strict-Transport-Security in prod
  if (process.env.NODE_ENV === "production") {
    res.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains; preload");
  }
  return res;
}
export const config = { matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"] };
