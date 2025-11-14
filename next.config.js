// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,

  // ðŸ”§ Desativa typedRoutes temporariamente (corrige erro de tipagem em /monsters/[id])
  experimental: {
    typedRoutes: false,
  },

  // âš™ï¸ ConfiguraÃ§Ãµes de imagens remotas (para futuras integraÃ§Ãµes com API/CDN)
  images: {
    remotePatterns: [
      // { protocol: 'https', hostname: 'cdn.swap.dev.br' },
      // { protocol: 'https', hostname: 'api.swap.dev.br' },
    ],
  },

  // ðŸ”„ Redirecionamentos automÃ¡ticos de rotas legadas
  async redirects() {
    return [
      // Antigas rotas de autenticaÃ§Ã£o â†’ novas rotas padronizadas
      { source: '/auth/login', destination: '/login', permanent: false },
      { source: '/auth/register', destination: '/register', permanent: false },
      { source: '/auth/logout', destination: '/logout', permanent: false },
      { source: '/auth/forgot', destination: '/forgot', permanent: false },

      // Rotas em portuguÃªs â†’ equivalentes em inglÃªs
      { source: '/otimizador/:path*', destination: '/optimizer/:path*', permanent: false },
      { source: '/runas/:path*', destination: '/runes/:path*', permanent: false },
      { source: '/equipes/:path*', destination: '/teams/:path*', permanent: false },
    ];
  },
};

module.exports = nextConfig;






