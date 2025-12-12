import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/login", "/register", "/api/auth/login", "/api/auth/register", "/api/lang"];
const ASSETS = ["/_next", "/favicon.ico"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // allow assets
  if (ASSETS.some(p => pathname.startsWith(p))) return NextResponse.next();
  if (PUBLIC_PATHS.some(p => pathname === p)) return NextResponse.next();

  // allow public info pages (optional) - keep everything protected except auth
  const token = request.cookies.get("bt_session")?.value;
  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api/health).*)"],
};
