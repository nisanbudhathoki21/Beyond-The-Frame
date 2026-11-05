/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  basePath: '/Beyond-The-Frame',
  images: {
    unoptimized: true,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' },
      { protocol: 'https', hostname: 'cdn.nextlevelbuilder.io' },
      { protocol: 'https', hostname: '**.unsplash.com' },
      { protocol: 'https', hostname: '**.pexels.com' },
      { protocol: 'https', hostname: '**.dreamstime.com' },
      { protocol: 'https', hostname: 'imgs.search.brave.com' },
    ],
    formats: ['image/avif', 'image/webp'],
  },
  transpilePackages: ['three'],
  experimental: { serverActions: { allowedOrigins: ['*'] } },
};
export default nextConfig;