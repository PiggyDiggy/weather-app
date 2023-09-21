import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // somehow get location by ip
  const location = "Moscow";
  return NextResponse.redirect(new URL(`/${location}`, request.url))
}

export const config = {
  matcher: "/",
};
