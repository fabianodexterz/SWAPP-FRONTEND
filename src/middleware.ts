import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

/**
 * SWAPP middleware: redireciona caminhos antigos (PT-BR) para os novos (EN).
 * MantÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©m compatibilidade de links antigos apÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â³s a limpeza de pastas.
 */
export function middleware(req: NextRequest) {
  const url = req.nextUrl.clone();

  // Mapa de rotas antigas -> rotas novas
  const routes: Record<string, string> = {
    '/otimizador': '/optimizer',
    '/runas': '/runes',
    '/equipes': '/teams',

    // Se alguÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â©m acessar as antigas rotas aninhadas de auth:
    '/auth/login': '/login',
    '/auth/register': '/register',
    '/auth/logout': '/logout',
    '/auth/forgot': '/forgot',
  };

  const direct = routes[url.pathname];
  if (direct) {
    url.pathname = direct;
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  // Aplica middleware apenas quando necessÃƒÆ’Ã†â€™Ãƒâ€ Ã¢â‚¬â„¢ÃƒÆ’Ã¢â‚¬Â ÃƒÂ¢Ã¢â€šÂ¬Ã¢â€žÂ¢ÃƒÆ’Ã†â€™ÃƒÂ¢Ã¢â€šÂ¬Ã…Â¡ÃƒÆ’Ã¢â‚¬Å¡Ãƒâ€šÃ‚Â¡rio
  matcher: [
    '/otimizador',
    '/runas',
    '/equipes',
    '/auth/:path*',
  ],
};
