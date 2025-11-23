// middleware.ts or middleware.js

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(req: NextRequest) {
  const privySession = req.cookies.get("privy-session");
  const url = req.nextUrl.clone();
  
  // 1. Logic for Protected Routes (e.g., /dashboard)
  // If the user tries to access a protected route and is NOT signed in, redirect to home.
  if (url.pathname.startsWith("/dashboard")) {
    if (!privySession) {
      // You might want to redirect to a specific login page instead of the homepage, 
      // but based on your original code, we'll redirect to /.
      url.pathname = "/"; 
      return NextResponse.redirect(url);
    }
  }

  // 2. Logic for the Homepage (if it's a signed-out-only page)
  // **If you only want signed-out users to see the homepage, use this:**
  /*
  if (url.pathname === "/" && privySession) {
    // If signed in, redirect them to their dashboard or a signed-in homepage.
    url.pathname = "/dashboard";
    return NextResponse.redirect(url);
  }
  */
  
  // **Since you want signed-in users to still see the homepage, we skip the logic above.**
  // If the user is signed in, or if the route is not protected, allow the request to proceed.

  return NextResponse.next();
}