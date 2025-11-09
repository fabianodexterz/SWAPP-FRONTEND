import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// Rotas que exigem login (ajuste conforme suas páginas)
const PROTECTED = [
  '/dashboard',
  '/optimizer',
  '/presets',
  '/tools',
  '/monsters',
];

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const isProtected = PROTECTED.some((p) => pathname.startsWith(p));
  if (!isProtected) return NextResponse.next();

  // Cookie simples de demonstração
  const hasAuth = req.cookies.get('auth')?.value === '1';
  if (hasAuth) return NextResponse.next();

  const url = req.nextUrl.clone();
  url.pathname = '/login';
  url.searchParams.set('from', pathname);
  return NextResponse.redirect(url);
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/optimizer/:path*',
    '/presets/:path*',
    '/tools/:path*',
    '/monsters/:path*',
  ],
};
