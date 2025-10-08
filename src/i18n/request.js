// src/i18n/request.js
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';
import { headers } from 'next/headers';

export default getRequestConfig(async () => {
  // Read locale from middleware header
  const headersList = await headers();
  let locale = headersList.get('x-current-locale');

  // Validation and fallback
  if (!locale || !routing.locales.includes(locale)) {
    console.warn('⚠️ Invalid locale from header:', locale, '- Using default');
    locale = routing.defaultLocale;
  }

  console.log('🟢 Request config using locale:', locale);

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default
  };
});