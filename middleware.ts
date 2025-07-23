import { NextResponse } from "next/server";
import { NextRequest } from "next/server";

export const publicRoutes = [
  "/",
  "/login",
  "/signup",
  "/send-email",
  "/reset-password",
];

export function middleware(request: NextRequest) {
  const pathname = request.nextUrl.pathname;
  const token = request.cookies.get("token")?.value || "";

  if (publicRoutes.includes(pathname) && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/", "/login", "/signup", "/send-email", "/reset-password"],
};
