import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest) {
  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // return early if url isn't supposed to be protected
  if (!!req.url.match(/\/auth/) || !req.page.name) {
    if (req.nextUrl.pathname === "/auth" && session)
      return NextResponse.redirect(new URL("/", req.url));

    return NextResponse.next();
  }

  console.log(req.url);
  // You could also check for any property on the session object,
  // like role === "admin" or name === "John Doe", etc.
  if (!session) return NextResponse.redirect(new URL("/auth", req.url));

  // If user is authenticated, continue.
  return NextResponse.next();
}
