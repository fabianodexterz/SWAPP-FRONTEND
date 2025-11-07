/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  // Intencionalmente NÃO definimos `output: 'export'` para evitar build estático puro.
};

export default nextConfig;
