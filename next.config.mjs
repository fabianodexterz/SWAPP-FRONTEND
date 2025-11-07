/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',            // gera HTML estático em /out
  trailingSlash: true,         // ajuda em hospedagem estática (cPanel)
  images: { unoptimized: true },
  reactStrictMode: true,
};

export default nextConfig;
