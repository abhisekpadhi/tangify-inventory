import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const session = request.cookies.get("session")?.value;
  const { pathname } = request.nextUrl;

  // Case 1: No session cookie → block /inventory
  if (pathname.startsWith("/inventory") && !session) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  // Case 2: Session cookie exists → block /
  if (pathname === "/" && session) {
    return NextResponse.redirect(new URL("/inventory", request.url));
  }

  // Otherwise, allow request
  return NextResponse.next();
}

export const config = {
  matcher: ["/", "/inventory/:path*"], // apply only to / and /inventory
};
