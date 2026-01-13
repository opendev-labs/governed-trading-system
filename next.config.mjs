/** @type {import('next').NextConfig} */
const isStatic = process.env.STATIC_EXPORT === 'true';

const nextConfig = {
  output: isStatic ? 'export' : undefined,
  basePath: isStatic ? '/scantrade' : '',
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  async rewrites() {
    // Rewrites don't work in static export, but we keep them for Vercel/Dev
    if (isStatic) return [];

    return [
      {
        source: '/api/:path*',
        destination: process.env.NODE_ENV === 'development'
          ? 'http://localhost:8000/api/:path*'
          : '/api/:path*',
      },
    ]
  },
}

export default nextConfig