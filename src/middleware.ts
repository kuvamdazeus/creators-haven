import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const restrictedRoutes = [
    "/feed",
    "/search",
    "/discover",
    "/profile",
    "/settings",
    "/notifications",
  ];

  // if (
  //   restrictedRoutes.includes(request.nextUrl.pathname) &&
  //   !request.cookies.get("auth")
  // ) {
  //   return NextResponse.redirect(request.nextUrl.origin + "/login");
  // }

  return NextResponse.next();
}
