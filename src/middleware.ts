// import { NextRequest, NextResponse } from 'next/server';
// import { getSession } from 'next-auth/react'; // Assuming you're using next-auth for authentication

// export default async function middleware(req: NextRequest) {
//   const { pathname } = req.nextUrl;
  
//   // Define protected routes
//   const protectedRoutes = ['/invoices'];
  
//   // Check if the requested path is a protected route
//   if (protectedRoutes.includes(pathname)) {
//     // Get the session
//     const session = await getSession({ req });
    
//     // If no session (i.e., user is not authenticated), redirect to login page
//     if (!session?.user) {
//       const loginUrl = new URL('/', req.nextUrl.origin);
//       return NextResponse.redirect(loginUrl.toString());
//     }
//   }
  
//   // Allow access to other routes
//   return NextResponse.next();
// }

import { NextRequest, NextResponse } from "next/server";
// import { isDemoMode, isPilotMode } from "./utils/constants";
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

  // if (req.nextUrl.pathname === "/") {
  //   const absoluteURL = new URL("/request", req.nextUrl.origin);
  //   return NextResponse.redirect(absoluteURL.toString());
  // }

  if (true) {
    return;
  }
}