import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';
import createNextIntlPlugin from 'next-intl/plugin';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizeCss: true,
  },

  /* ---------------- IMAGE OPTIMIZATION (CRITICAL) ---------------- */
  images: {
    // Modern formats → smaller size → faster LCP
    formats: ['image/avif', 'image/webp'],

    // Responsive image sizes (important for blog grids)
    deviceSizes: [320, 420, 640, 768, 1024, 1280, 1536],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],

    // Cache images longer (CDN friendly)
    minimumCacheTTL: 60 * 60 * 24 * 7, // 7 days

    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'firebasestorage.googleapis.com',
      },
      {
        protocol: 'https',
        hostname: 'images.pexels.com',
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com',
      },
      {
        protocol: 'https',
        hostname: 'pub-0e3a11849d0e47749d9082d6fde434df.r2.dev',
      },
    ],
  },

  /* ---------------- TRACING ROOT ---------------- */
  outputFileTracingRoot: resolve(__dirname),

  /* ---------------- PROD CLEANUP ---------------- */
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  /* ---------------- REDIRECTS ---------------- */
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [{ type: 'host', value: 'explorethebuzz.com' }],
        destination: 'https://www.explorethebuzz.com/:path*',
        permanent: true,
      },
    ];
  },
};

/* ---------------- next-intl plugin ---------------- */
const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

export default withNextIntl(nextConfig);
