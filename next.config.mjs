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
  serverExternalPackages: ['resend', '@react-email/render'],
  images: {
    formats: ['image/avif', 'image/webp'],
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
            value: "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://challenges.cloudflare.com https://dev.gesit.co.id https://www.googletagmanager.com https://www.google-analytics.com https://connect.facebook.net; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; img-src 'self' data: blob: https://bbntlrtozsdqvelsxlhz.supabase.co https://res.cloudinary.com https://dev.gesit.co.id https://gesit.co.id https://blogger.googleusercontent.com https://*.googleusercontent.com https://upload.wikimedia.org https://www.google-analytics.com https://www.facebook.com; font-src 'self' data: https://fonts.gstatic.com https://dev.gesit.co.id; connect-src 'self' https://bbntlrtozsdqvelsxlhz.supabase.co https://challenges.cloudflare.com https://dev.gesit.co.id https://www.google-analytics.com https://analytics.google.com https://stats.g.doubleclick.net https://connect.facebook.net; frame-src 'self' https://www.youtube.com https://challenges.cloudflare.com; media-src 'self' https://bbntlrtozsdqvelsxlhz.supabase.co https://dev.gesit.co.id https://gesit.co.id;",
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
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
