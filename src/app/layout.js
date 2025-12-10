// src/app/layout.js
import { Geist, Geist_Mono } from 'next/font/google';
import Script from 'next/script';
import './globals.css';
import Navbar from '@/components/navbar';
import { ThemeProvider } from '@/components/themeprovider';
import { NextIntlClientProvider } from 'next-intl';
import { routing } from '@/i18n/routing';
import {
  baseMetadata,
  organizationJsonLd,
  websiteJsonLd,
} from '@/lib/seoMetadata';
import FirebaseAnalytics from '@/components/FirebaseAnalytics';

const ADSENSE_PUB_ID =
  process.env.NEXT_PUBLIC_ADSENSE_ID;

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata = {
  metadataBase: new URL('https://explorethebuzz.com'),
  title: baseMetadata.title,
  description: baseMetadata.description,
  keywords: baseMetadata.keywords,
  authors: baseMetadata.authors,
  creator: 'ExploretheBuzz Team',
  publisher: 'ExploretheBuzz',
  openGraph: baseMetadata.openGraph,
  twitter: baseMetadata.twitter,
  robots: baseMetadata.robots,
  alternates: baseMetadata.alternates,
  icons: {
    icon: [
      { url: '/favicon.ico' },
      { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
    ],
    apple: '/apple-touch-icon.png',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION || '',
  },
  other: {
    'format-detection': 'telephone=no',
    'apple-mobile-web-app-capable': 'yes',
    'apple-mobile-web-app-status-bar-style': 'black-translucent',
    'mobile-web-app-capable': 'yes',
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
  colorScheme: 'light dark',
};

export default function RootLayout({ children, params }) {
  const locale = params?.locale || 'en';

  return (
    <html lang={locale} suppressHydrationWarning>
      <head>
        {/* Google AdSense Account Verification Meta */}
        <meta name="google-adsense-account" content={ADSENSE_PUB_ID} />

        {/* Hreflang setup */}
        {routing.locales.map((loc) => (
          <link
            key={loc}
            rel="alternate"
            hrefLang={loc}
            href={`https://www.explorethebuzz.com/${loc === 'en' ? '' : loc}`}
          />
        ))}
        <link
          rel="alternate"
          hrefLang="x-default"
          href="https://www.explorethebuzz.com"
        />

        <link rel="preconnect" href="https://pagead2.googlesyndication.com" />
        <link rel="preconnect" href="https://googleads.g.doubleclick.net" />

        {/* AdSense Script */}
        <Script
          async
          strategy="afterInteractive"
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${ADSENSE_PUB_ID}`}
          crossOrigin="anonymous"
        />
      </head>

      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <NextIntlClientProvider>
            <Navbar />
            <FirebaseAnalytics />
            {children}
          </NextIntlClientProvider>
        </ThemeProvider>

        {/* Google Analytics */}
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script id="google-analytics" strategy="afterInteractive">
              {`
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
              `}
            </Script>
          </>
        )}
      </body>
    </html>
  );
}
