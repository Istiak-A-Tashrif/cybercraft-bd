import { NextRequest, NextResponse } from "next/server";

// Define protected routes for role-based access
const protectedRoutes = ["/contacts"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const userRole = req.cookies.get("userRole")?.value;
  const url = req.nextUrl.clone();

  // Exclude the `/logged-out` route from middleware checks
  if (url.pathname === "/logged-out") {
    return NextResponse.next();
  }

  // If no token exists, redirect to login for non-public routes
  if (!token) {
    if (
      url.pathname === "/login" ||
      url.pathname === "/signup" ||
      url.pathname === "/logged-out"
    ) {
      return NextResponse.next(); // Allow access to login, signup, or logged-out
    }
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login
  }

  try {
    const isAdmin = userRole === "admin";

    // Handle redirection for admin users
    if (isAdmin) {
      if (url.pathname === "/") {
        return NextResponse.redirect(new URL("/contacts", req.url)); // Admin should go to /contacts
      }
      if (url.pathname === "/login" || url.pathname === "/signup") {
        return NextResponse.redirect(new URL("/contacts", req.url)); // Redirect to /contacts
      }
    }

    // Handle redirection for non-admin users
    if (!isAdmin) {
      if (url.pathname === "/contacts") {
        return NextResponse.redirect(new URL("/", req.url)); // Redirect non-admin to homepage
      }
      if (url.pathname === "/login" || url.pathname === "/signup") {
        return NextResponse.redirect(new URL("/", req.url)); // Redirect non-admin to homepage
      }
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return NextResponse.redirect(new URL("/login", req.url)); // On error, redirect to login
  }
}

// Apply middleware to these routes
export const config = {
  matcher: ["/", "/contacts", "/login", "/signup", "/logged-out"],
};
