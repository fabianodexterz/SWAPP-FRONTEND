/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  // Garante build em modo server (NÃO estático)
  // Remova qualquer 'output: "export"' anterior
  output: undefined,
  images: { unoptimized: false },
  experimental: {
    typedRoutes: true
  }
};
export default nextConfig;
