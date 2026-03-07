import { NextRequest, NextResponse } from "next/server";

// No NEXT_PUBLIC_ prefix — this value never reaches the client bundle
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD;

export async function POST(req: NextRequest) {
  if (!ADMIN_PASSWORD) {
    return NextResponse.json(
      { error: "ADMIN_PASSWORD not set in environment variables." },
      { status: 500 }
    );
  }
  const { password } = await req.json();
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: "Incorrect password." }, { status: 401 });
  }
  const response = NextResponse.json({ ok: true });
  response.cookies.set("admin_session", "authenticated", {
    httpOnly: true,
    secure:   process.env.NODE_ENV === "production",
    sameSite: "strict",
    maxAge:   60 * 60 * 8, // 8 hours
    path:     "/admin",
  });
  return response;
}

export async function DELETE() {
  const response = NextResponse.json({ ok: true });
  response.cookies.delete("admin_session");
  return response;
}
