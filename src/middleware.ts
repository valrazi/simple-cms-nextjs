import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
    const authToken = request.cookies.get('auth_token')
    if(request.nextUrl.pathname.startsWith('/main')) {
        if(!authToken) {
            return NextResponse.redirect(new URL('/auth/sign-in/', request.nextUrl.origin))
        }
    }
    if(request.nextUrl.pathname == '/auth/sign-in') {
        if(authToken) {
            return NextResponse.redirect(new URL('/main/', request.nextUrl.origin))
        }
    }
    return NextResponse.next()
}