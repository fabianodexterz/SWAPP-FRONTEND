import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// Redireciona a raiz para /login (outra rota pode ser usada se preferir)
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();
  if (url.pathname === '/' || url.pathname === '') {
    url.pathname = '/login';
    return NextResponse.redirect(url);
  }
  return NextResponse.next();
}

// Aplica o middleware em tudo exceto assets estáticos
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|images|icons|public).*)'
  ]
};
