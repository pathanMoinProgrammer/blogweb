// next.config.mjs
import createNextIntlPlugin from 'next-intl/plugin';

// i18n request config ka path
const withNextIntl = createNextIntlPlugin('./src/i18n/request.js');

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Agar koi aur config ho toh yaha add karo
};

export default withNextIntl(nextConfig);