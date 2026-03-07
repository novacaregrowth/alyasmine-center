import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  // Only protect /admin routes (not /api/admin/auth which handles the login itself)
  if (pathname.startsWith("/admin") && !pathname.startsWith("/api/admin/auth")) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
      // Redirect to login page
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = "/admin/login";
      // Avoid redirect loop
      if (pathname !== "/admin/login") {
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
