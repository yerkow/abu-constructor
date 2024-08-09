import { NextRequest, NextResponse } from "next/server";
import createIntlMiddleware from "next-intl/middleware";

// Locale middleware setup
const intlMiddleware = createIntlMiddleware({
  locales: ["ru", "kz"],
  defaultLocale: "ru",
});

// Authentication and redirection middleware
function authMiddleware(req: NextRequest) {
  console.log("auth");

  const token = req.cookies.get("token");
  const { pathname } = req.nextUrl;

  const locale = pathname.split("/")[1];

  if (pathname.startsWith(`/${locale}/admin`)) {
    if (token && pathname === `/${locale}/admin/login`) {
      return NextResponse.redirect(new URL(`/${locale}/admin`, req.url));
    }
    if (!token && pathname !== `/${locale}/admin/login`) {
      return NextResponse.redirect(new URL(`/${locale}/admin/login`, req.url));
    }
  }

  // If no redirect is needed, allow the request to proceed
  return NextResponse.next();
}

export function middleware(req: NextRequest) {
  console.log("Middleware is running");

  // Apply the authentication middleware first
  const authResponse = authMiddleware(req);
  if (authResponse && authResponse.status !== 200) {
    // If authMiddleware returns a response (redirect), return it
    return authResponse;
  }

  // Then apply the locale middleware
  return intlMiddleware(req);
}

export const config = {
  matcher: [
    "/", // Root
    "/(ru|kz)", // Locales
    "/(ru|kz)/:path*", // All paths under a locale
    "/(ru|kz)/admin/:path*", // Admin paths
  ],
};
