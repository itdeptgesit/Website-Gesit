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
};

export default nextConfig;
