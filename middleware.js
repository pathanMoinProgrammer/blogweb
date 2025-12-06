import { NextResponse } from 'next/server';
import createIntlMiddleware from 'next-intl/middleware';
import { routing } from './src/i18n/routing';

const intlMiddleware = createIntlMiddleware(routing);

export default function middleware(request) {
  const { pathname } = request.nextUrl;

  // Check if the locale is valid
  const locale = pathname.split('/')[1];

  if (!routing.locales.includes(locale)) {
    const newPathname = `/${routing.defaultLocale}${pathname}`;
    return NextResponse.redirect(new URL(newPathname, request.url));
  }

  // Delegate to next-intl middleware
  return intlMiddleware(request);
}

export const config = {
  matcher: [
    '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
  ],
};


