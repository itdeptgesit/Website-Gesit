/** @type {import('next').NextConfig} */
const nextConfig = {
  allowedDevOrigins: ['192.168.5.3', '192.168.10.254'],
  devIndicators: {
    appIsrStatus: false,
    buildActivity: false,
  },
  // Allow large file uploads (video up to 50MB)
  experimental: {
    serverActions: {
      bodySizeLimit: '50mb',
    },
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'dev.gesit.co.id',
      },
      {
        protocol: 'https',
        hostname: 'gesit.co.id',
      },
      {
        protocol: 'https',
        hostname: 'bbntlrtozsdqvelsxlhz.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://challenges.cloudflare.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: https://bbntlrtozsdqvelsxlhz.supabase.co https://res.cloudinary.com https://dev.gesit.co.id https://gesit.co.id http://dev.gesit.co.id http://gesit.co.id https://blogger.googleusercontent.com https://*.googleusercontent.com https://upload.wikimedia.org; font-src 'self' data: https://fonts.gstatic.com http://dev.gesit.co.id; connect-src 'self' https://bbntlrtozsdqvelsxlhz.supabase.co https://challenges.cloudflare.com; frame-src 'self' https://www.youtube.com https://challenges.cloudflare.com; media-src 'self' https://bbntlrtozsdqvelsxlhz.supabase.co https://dev.gesit.co.id https://gesit.co.id http://dev.gesit.co.id http://gesit.co.id;",
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'origin-when-cross-origin',
          },
        ],
      },
    ];
  },
  async rewrites() {
    return [];
  },
};

export default nextConfig;
