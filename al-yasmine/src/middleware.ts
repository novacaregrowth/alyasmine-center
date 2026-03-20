import { NextRequest, NextResponse } from "next/server";

const locales = ["en", "ar"];
const defaultLocale = "en";

function getLocaleFromPath(pathname: string): string | null {
  const segments = pathname.split("/");
  const maybeLocale = segments[1];
  return locales.includes(maybeLocale) ? maybeLocale : null;
}

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (
    pathname.startsWith("/api/") ||
    pathname.startsWith("/_next/") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/hero-frames-webp/") ||
    pathname.includes(".") // static files
  ) {
    return NextResponse.next();
  }

  // Admin auth — runs for /en/admin, /ar/admin, and bare /admin paths
  const strippedPath = pathname.replace(/^\/(en|ar)/, "") || "/";
  if (strippedPath.startsWith("/admin") && !strippedPath.startsWith("/api/admin/auth")) {
    const session = req.cookies.get("admin_session");
    if (session?.value !== "authenticated") {
      const locale = getLocaleFromPath(pathname) || defaultLocale;
      const loginUrl = req.nextUrl.clone();
      loginUrl.pathname = `/${locale}/admin/login`;
      if (!strippedPath.endsWith("/admin/login")) {
        return NextResponse.redirect(loginUrl);
      }
    }
  }

  const pathnameLocale = getLocaleFromPath(pathname);
  if (pathnameLocale) {
    return NextResponse.next();
  }

  // Redirect to locale-prefixed path
  const locale = defaultLocale;
  const newUrl = req.nextUrl.clone();
  newUrl.pathname = `/${locale}${pathname === "/" ? "" : pathname}`;
  return NextResponse.redirect(newUrl);
}

export const config = {
  matcher: ["/((?!_next|api|images|hero-frames-webp|favicon.ico|noise.png|.*\\..*).*)"],
};
