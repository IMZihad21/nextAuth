import { getToken } from "next-auth/jwt";
import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest, res: NextResponse) {
  const url = req.nextUrl.clone();
  // return early if url isn't supposed to be protected
  if (url.pathname.includes("/auth")) {
    return NextResponse.next();
  }

  const session = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  // You could also check for any property on the session object,
  // like role === "admin" or name === "John Doe", etc.
  if (!session) return NextResponse.rewrite(new URL("/auth", req.url));

  // If user is authenticated, continue.
  return NextResponse.next();
}
