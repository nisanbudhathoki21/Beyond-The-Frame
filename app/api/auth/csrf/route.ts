import { NextRequest, NextResponse } from "next/server";
import { generateCsrfToken } from "@/lib/auth";

export async function GET(req: NextRequest) {
  const token = generateCsrfToken();
  const res = NextResponse.json({ token });
  res.cookies.set(process.env.CSRF_COOKIE_NAME || "nls_csrf", token, { httpOnly: false, sameSite: "lax", path: "/", maxAge: 60*60 });
  return res;
}
