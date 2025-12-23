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

  images: {
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

  // Ensure Next infers this repository's root (helps locate next-intl config)
  outputFileTracingRoot: resolve(__dirname),

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

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

// next-intl plugin
const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

export default withNextIntl(nextConfig);


// // next.config.mjs
// import createNextIntlPlugin from 'next-intl/plugin';

// // i18n request config ka path
// const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

// /** @type {import('next').NextConfig} */
// const nextConfig = {
//   // Agar koi aur config ho toh yaha add karo
// };

// export default withNextIntl(nextConfig);
