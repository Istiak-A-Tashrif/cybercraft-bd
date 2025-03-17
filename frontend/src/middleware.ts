import { NextRequest, NextResponse } from "next/server";

// Define protected routes for role-based access
const protectedRoutes = ["/contacts"];

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value; // Correct way to get cookies in middleware
  const url = req.nextUrl.clone();

  if (!token) {
    // If user is not logged in, allow access only to public routes
    if (url.pathname === "/login" || url.pathname === "/signup") {
      return NextResponse.next();
    }
    return NextResponse.redirect(new URL("/login", req.url));
  }

  try {
    // Fetch the current user details
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    if (!response.ok) throw new Error("Invalid user");

    const user = await response.json();

    const isAdmin = user?.data?.role === "admin";

    // Redirect users based on roles when accessing "/"
    if (url.pathname === "/") {
      return NextResponse.redirect(new URL(isAdmin ? "/contacts" : "/", req.url));
    }

    // Redirect users based on roles when accessing "/contacts"
    if (url.pathname === "/contacts" && !isAdmin) {
      return NextResponse.redirect(new URL("/", req.url));
    }

    // Redirect users from login/signup if already logged in
    if (url.pathname === "/login" || url.pathname === "/signup") {
      return NextResponse.redirect(new URL(isAdmin ? "/contacts" : "/", req.url));
    }

    return NextResponse.next();
  } catch (error) {
    console.error("Middleware Error:", error);
    return NextResponse.redirect(new URL("/login", req.url));
  }
}

// Apply middleware to these routes
export const config = {
  matcher: ["/", "/contacts", "/login", "/signup"],
};
