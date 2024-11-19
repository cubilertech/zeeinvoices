// import { NextRequest, NextResponse } from "next/server";

// const protectedRoutes = ["/request/preview", "/request/recent"];
// const protectedRoutes2 = ["/request/recent"];

// export default function middleware(req: NextRequest, res: NextResponse) {
//   if ( protectedRoutes.includes(req.nextUrl.pathname)) {
//     const absoluteURL = new URL("/request/results", req.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
//   if ( protectedRoutes2.includes(req.nextUrl.pathname)) {
//     const absoluteURL = new URL("/request/results", req.nextUrl.origin);
//     return NextResponse.redirect(absoluteURL.toString());
//   }
//   if (true) {
//     return;
//   }
// }
"use client";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export async function middleware(req: NextRequest) {
  // const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const token = req.cookies.get("next-auth.session-token")?.value;
  // List of restricted routes
  const restrictedRoutes = ["/invoices", "/senders", "/clients"];

  // Check if the user is accessing a restricted route
  const isRestrictedRoute = restrictedRoutes.some((route) =>
    req.nextUrl.pathname.startsWith(route)
  );

  if (isRestrictedRoute && !token) {
    // Redirect the user to the login page if no session is found
    return NextResponse.redirect(new URL("/", req.url));
  }

  return NextResponse.next(); // Proceed as usual
}

export const config = {
  matcher: ["/invoices/:path*", "/senders/:path*", "/clients/:path*"], // Define the routes where this middleware applies
};
