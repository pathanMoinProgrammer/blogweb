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
    remotePatterns: [{ hostname: 'firebasestorage.googleapis.com' }],
  },
  // Ensure Next infers this repository's root (helps locate next-intl config)
  outputFileTracingRoot: resolve(__dirname),
  // Bundle splitting + tree-shaking
  // swcMinify: true,
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
  // …rest of your config
};

// Point the plugin at the request config used by this project.
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
