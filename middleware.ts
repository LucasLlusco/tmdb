import { NextRequest, NextResponse } from "next/server";
import { getLoggedInUser } from "./lib/actions/auth.actions";

export async function middleware(req: NextRequest) {
  const user = await getLoggedInUser();

  if(req.nextUrl.pathname === "/login" || req.nextUrl.pathname === "/signup") {
    if(user) {
      return NextResponse.redirect(new URL(`/user/${user.userId}`, req.url));
    }
  } else {
    if(!user) {
      return NextResponse.redirect(new URL("/login", req.url)); 
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/signup", "/settings/delete", "/settings/profile", "/settings/change-email", "/settings/change-password"]
};