import { NextRequest, NextResponse } from "next/server";
import { requireAuth } from "./lib/actions/auth.actions";

export async function middleware(req: NextRequest) {
  const { isAuth, userId } = await requireAuth();
  
  if(req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup" || req.nextUrl.pathname === "/forgot-password" || req.nextUrl.pathname === "/reset-password") {
    if(isAuth) {
      return NextResponse.redirect(new URL(`/user/${userId}`, req.url)); 
    }
  } else {
    if(!isAuth) {
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/settings/delete", "/settings/profile", "/settings/change-email", "/settings/change-password", "/forgot-password", "/reset-password"]
};