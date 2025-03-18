import { NextRequest, NextResponse } from "next/server";

// Define protected routes for role-based access
const protectedRoutes = ["/contacts"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Correct way to get cookies in middleware
  const userRole = req.cookies.get("userRole")?.value; // Check if user role is already stored
  const url = req.nextUrl.clone();

  // Exclude the `/logged-out` route from middleware checks
  if (url.pathname === "/logged-out") {
    return NextResponse.next();
  }

  // If no token exists, redirect to login for non-public routes
  if (!token) {
    if (url.pathname === "/login" || url.pathname === "/signup" || url.pathname === "/logged-out") {
      return NextResponse.next(); // Allow access to login, signup, or logged-out
    }
    return NextResponse.redirect(new URL("/login", req.url)); // Redirect to login
  }

  try {
    let isAdmin = userRole === "admin";

    // Fetch user details only if the role is not already stored in cookies
    if (!userRole) {
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      if (!response.ok) throw new Error("Invalid user");

      const user = await response.json();
      isAdmin = user?.data?.role === "admin";

      // Set the user role in cookies to avoid redundant API calls
      const res = NextResponse.next();
      res.cookies.set("userRole", isAdmin ? "admin" : "user", {
        httpOnly: true,
      });
    }

    // Handle redirection for admin users
    if (isAdmin) {
      if (url.pathname === "/") {
        return NextResponse.redirect(new URL("/contacts", req.url)); // Admin should go to /contacts
      }
      if (url.pathname === "/contacts") {
        return NextResponse.next(); // Allow access to contacts
      }
      if (url.pathname === "/login" || url.pathname === "/signup") {
        return NextResponse.redirect(new URL("/contacts", req.url)); // Redirect to /contacts
      }
    }

    // Handle redirection for non-admin users
    if (!isAdmin) {
      if (url.pathname === "/") {
        return NextResponse.next(); // Non-admin can access homepage
      }
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
