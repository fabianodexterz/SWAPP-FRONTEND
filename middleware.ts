import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(req: NextRequest) {
  const token = req.cookies.get('swapp_token')?.value
  const pathname = req.nextUrl.pathname
  const protectedRoutes = ['/monsters', '/profile']

  if (protectedRoutes.some(p => pathname.startsWith(p)) && !token) {
    const url = req.nextUrl.clone()
    url.pathname = '/login'
    return NextResponse.redirect(url)
  }
  return NextResponse.next()
}

export const config = {
  matcher: ['/monsters/:path*', '/profile'],
}
