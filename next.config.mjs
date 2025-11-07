// Next.js config — App Router ativo e build server na Vercel
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  experimental: { appDir: true },
  output: 'standalone'
}
export default nextConfig
