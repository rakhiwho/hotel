import { NextRequest, NextResponse } from "next/server";

export async function middleware(req: NextRequest)  {
  try {
    const path = req.nextUrl.pathname;

    const isPublicPath = path === "/login" || path === "/signup";

    const token = req.cookies.get("accessToken")?.value || "";
    if (isPublicPath && token) {
      return NextResponse.redirect(new URL("/", req.nextUrl));
    }
    if (!isPublicPath && !token) {
      return NextResponse.redirect(new URL("/login", req.nextUrl));
    }
    return NextResponse.next();
  } catch (error) {
    console.log(error);
    return NextResponse.json({ type: "invalid server error" }, { status: 500 });
  }
};

export const config = {
  matcher: ["/", "/login", "/signup" ,"/guestAdmin"  , "/hotelAdmin" , "/[hotel]" ]
}
