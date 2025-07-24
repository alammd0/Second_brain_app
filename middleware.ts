import { NextRequest, NextResponse } from "next/server";

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

  const isPublicRoute = publicRoutes.includes(pathname);

  if (token && isPublicRoute) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  if (!token && !isPublicRoute) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/login",
    "/signup",
    "/send-email",
    "/reset-password",
    "/dashboard/:path*",
  ],
};
