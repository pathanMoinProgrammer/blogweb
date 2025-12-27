import Link from 'next/link';
import { redirect } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { getTranslations } from '@/components/traslator';
import BlogListClient from '@/components/ui/BlogListClient';

/* ---------------- STATIC SETTINGS ---------------- */
export const dynamic = 'force-static';
export const revalidate = 300;
export const currentDomain = 'https://explorethebuzz.com';

/* ---------------- METADATA ---------------- */
export const metadata = {
  title: {
    default: 'ExploreTheBuzz – Crypto, AI Automation & Scam Awareness Blogs',
    template: '%s | ExploreTheBuzz',
  },
  description:
    'Latest 2025 guides on cryptocurrency earning, AI trading bots, play-to-earn games that actually pay, scam detection, and secure Next.js development.',
  keywords:
    'crypto earning 2025, AI trading bot, play to earn games, crypto scams, Next.js tutorial, AI automation, blockchain developer blog',
  authors: [{ name: 'ExploreTheBuzz Team' }],
  creator: 'ExploreTheBuzz',
  publisher: 'ExploreTheBuzz',
  metadataBase: new URL('https://explorethebuzz.com'),
  alternates: {
    canonical: '/',
    languages: Object.fromEntries(
      routing.locales.map((loc) => [loc, `/${loc}`])
    ),
  },
  openGraph: {
    title: 'ExploreTheBuzz – Crypto, AI & Scam Awareness Blogs',
    description:
      'Real guides on earning with crypto safely, building AI trading systems, spotting scams, and modern web development.',
    url: 'https://explorethebuzz.com',
    siteName: 'ExploreTheBuzz',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'ExploreTheBuzz – Crypto & AI Blogs',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ExploreTheBuzz',
    description: 'Crypto earning, AI automation, scam awareness & Next.js blogs',
    images: ['/og-image.png'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default async function HomePage({ params }) {
  const { locale } = params;

  /* -------- LOCALE GUARD -------- */
  if (!routing.locales.includes(locale)) {
    redirect('/en');
  }

  /* -------- TRANSLATIONS -------- */
  const tRow = await getTranslations(locale, 'Homepage');
  const t = tRow?.landingBottom || {};
  const t2 = await getTranslations(locale, 'Homepage');

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">

      {/* ================= BLOG LIST (BELOW THE FOLD) ================= */}
      <section className="content-visibility-auto contain-intrinsic-size-[1200px]">
        <BlogListClient locale={locale} t={t2} />
      </section>

      {/* ================= EDUCATIONAL CONTENT ================= */}
      <section className="container mx-auto px-4 py-10">
        <div className="text-left text-muted-foreground space-y-4 text-sm md:text-base leading-relaxed max-w-4xl">
          {t?.educationalContent?.p1 && (
            <p dangerouslySetInnerHTML={{ __html: t.educationalContent.p1 }} />
          )}
          {t?.educationalContent?.p2 && (
            <p dangerouslySetInnerHTML={{ __html: t.educationalContent.p2 }} />
          )}

          {Array.isArray(t?.educationalContent?.list) && (
            <ul className="list-disc pl-5 space-y-2">
              {t.educationalContent.list.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          )}

          {t?.educationalContent?.p3 && <p>{t.educationalContent.p3}</p>}
          {t?.educationalContent?.p4 && (
            <p dangerouslySetInnerHTML={{ __html: t.educationalContent.p4 }} />
          )}
        </div>
      </section>

      {/* ================= CLOSING CONTENT ================= */}
      <section className="max-w-3xl mx-auto px-4 py-8 text-center text-muted-foreground text-sm md:text-base leading-relaxed">
        {t?.closing?.p1 && (
          <p dangerouslySetInnerHTML={{ __html: t.closing.p1 }} />
        )}
        {t?.closing?.p2 && (
          <p dangerouslySetInnerHTML={{ __html: t.closing.p2 }} />
        )}
      </section>

      {/* ================= FOOTER LINKS ================= */}
      <footer className="border-t py-12 mt-4 bg-background">
        <div className="max-w-7xl mx-auto px-4 text-center space-x-6 text-muted-foreground">
          <Link href={`/${locale}/about`} className="underline hover:text-primary">
            {t?.footerLinks?.about || 'About'}
          </Link>
          <Link href={`/${locale}/contact`} className="underline hover:text-primary">
            {t?.footerLinks?.contact || 'Contact'}
          </Link>
          <Link
            href={`/${locale}/privacy-policy`}
            className="underline hover:text-primary"
          >
            {t?.footerLinks?.privacy || 'Privacy Policy'}
          </Link>
          <Link
            href={`/${locale}/terms-and-conditions`}
            className="underline hover:text-primary"
          >
            {t?.footerLinks?.termsandcondition || 'Terms & Conditions'}
          </Link>
        </div>
      </footer>
    </main>
  );
}
