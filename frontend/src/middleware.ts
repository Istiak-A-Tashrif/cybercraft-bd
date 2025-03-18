import { NextRequest, NextResponse } from "next/server";

// Define protected routes for role-based access
const protectedRoutes = ["/contacts"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const userRole = req.cookies.get("userRole")?.value;
  const url = req.nextUrl.clone();

  if (url.pathname === "/logged-out") {
    return NextResponse.next();
  }

  if (!token) {
    if (
      url.pathname === "/login" ||
      url.pathname === "/signup" ||
      url.pathname === "/logged-out"
    ) {
      return NextResponse.next(); 
    }
    return NextResponse.redirect(new URL("/login", req.url)); 
  }

  try {
    const isAdmin = userRole === "admin";

    if (isAdmin) {
      if (url.pathname === "/") {
        return NextResponse.redirect(new URL("/contacts", req.url));
      }
      if (url.pathname === "/login" || url.pathname === "/signup") {
        return NextResponse.redirect(new URL("/contacts", req.url)); 
      }
    }

    if (!isAdmin) {
      if (url.pathname === "/contacts") {
        return NextResponse.redirect(new URL("/", req.url)); 
      }
      if (url.pathname === "/login" || url.pathname === "/signup") {
        return NextResponse.redirect(new URL("/", req.url)); 
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
