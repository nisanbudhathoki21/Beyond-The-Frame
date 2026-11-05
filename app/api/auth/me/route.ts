import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/auth";
export async function GET(req: NextRequest) {
  const token = req.cookies.get(process.env.SESSION_COOKIE_NAME || "nls_session")?.value;
  if (!token) return NextResponse.json({ authenticated: false }, { status: 200 });
  const sess = verifySession(token);
  if (!sess) return NextResponse.json({ authenticated: false }, { status: 200 });
  return NextResponse.json({ authenticated: true, email: sess.email, role: sess.role });
}
