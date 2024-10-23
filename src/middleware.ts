import { NextRequest, NextResponse } from "next/server";

const protectedRoutes = ["/request/preview", "/request/recent"];
const protectedRoutes2 = ["/request/recent"];

export default function middleware(req: NextRequest, res: NextResponse) {
  if ( protectedRoutes.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/request/results", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if ( protectedRoutes2.includes(req.nextUrl.pathname)) {
    const absoluteURL = new URL("/request/results", req.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }
  if (true) {
    return;
  }
}