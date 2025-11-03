// src/i18n/routing.js
import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
  locales: ['en', 'hi', 'pt', 'zh', 'pt-BR', 'es'],
  defaultLocale: 'en',
  localePrefix: 'always',
  localeDetection: true, // Auto-detect locale from URL
});
