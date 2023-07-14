import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const isAuthenticated = await getToken({ req });

  const pathname = req.nextUrl.pathname;
  const isSignInPage = pathname === "/sign-in";

  if (isSignInPage && isAuthenticated) {
    return NextResponse.redirect(new URL("/", req.nextUrl));
  }

  if (!isAuthenticated && !isSignInPage) {
    return NextResponse.redirect(new URL("/sign-in", req.nextUrl));
  }
}

export const config = {
  matcher: [
    "/community/:path*",
    "/settings",
    "/dashboard",
    "/watchlist",
    "/admin:path*",
    "/sign-in",
  ],
};
