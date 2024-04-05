import { NextResponse } from "next/server";

const protectedRoutes = ["/my-profile","/checkout"]
export function middleware(req) {
    const token = req.cookies.get('token')?.value
    const url = req.nextUrl.pathname;
    if (!token && protectedRoutes.includes(url)) {
      return NextResponse.redirect(new URL("/auth", req.url));
    }
    if (token && url==="/auth") {
      return NextResponse.redirect(new URL("/my-profile", req.url));
    }
}

