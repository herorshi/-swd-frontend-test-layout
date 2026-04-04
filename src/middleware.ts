import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/_next")) {
    return NextResponse.next();
  }
  if (pathname.startsWith("/api")) {
    return NextResponse.next();
  }
  if (pathname === "/favicon.ico") {
    return NextResponse.next();
  }
  // ไฟล์ใน public (มีนามสกุล เช่น .svg, .png)
  if (/\.[^/]+$/.test(pathname)) {
    return NextResponse.next();
  }
  if (pathname === "/layout" || pathname === "/layout/") {
    return NextResponse.next();
  }

  return NextResponse.redirect(new URL("/layout", request.url));
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|_next/webpack-hmr).*)"],
};
