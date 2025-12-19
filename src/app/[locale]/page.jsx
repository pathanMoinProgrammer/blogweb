import Link from 'next/link';
import { routing } from '../../i18n/routing';
import { redirect } from 'next/navigation';
import BlogPage from './blogpost/page';
import { getTranslations } from '@/components/traslator';

export const dynamic = 'force-static';
export const revalidate = 300;
export const currentDomain = 'https://explorethebuzz.com';
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
  const { locale } = await params;
  if (!routing.locales.includes(locale)) redirect('/en');
  const tRow = await getTranslations(locale, 'Homepage');
  const t = tRow.landingBottom || {};
  const t2 = await getTranslations(locale, 'Homepage');

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">
      <section className="py-2 ">
        <div className=" px-1">
          <BlogPage params={params} />
        </div>
        <section className="container mx-auto px-4 py-8">
          <div className="text-left text-muted-foreground space-y-4 text-sm md:text-base leading-relaxed">
            <p
              dangerouslySetInnerHTML={{ __html: t?.educationalContent?.p1 }}
            />
            <p
              dangerouslySetInnerHTML={{ __html: t?.educationalContent?.p2 }}
            />
            <ul className="list-disc pl-5 space-y-2">
              {t?.educationalContent?.list?.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
            <p>{t?.educationalContent?.p3}</p>
            <p
              dangerouslySetInnerHTML={{ __html: t?.educationalContent?.p4 }}
            />
          </div>
        </section>
      </section>

      <div className="max-w-3xl mx-auto px-4 py-8 text-center text-muted-foreground text-sm md:text-base leading-relaxed">
        <p dangerouslySetInnerHTML={{ __html: t?.closing?.p1 }} />
        <p dangerouslySetInnerHTML={{ __html: t?.closing?.p2 }} />
      </div>
      <footer className="border-t py-12 mt-4 bg-background">
        <div className="max-w-7xl mx-auto px-4 text-center space-x-6 text-muted-foreground">
          <Link
            href={`/${locale}/about`}
            className="underline hover:text-primary"
          >
            {t?.footerLinks?.about}
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="underline hover:text-primary"
          >
            {t?.footerLinks?.contact}
          </Link>
          <Link
            href={`/${locale}/privacy-policy`}
            className="underline hover:text-primary"
          >
            {t?.footerLinks?.privacy}
          </Link>
          <Link
            href={`/${locale}/terms-and-conditions`}
            className="underline hover:text-primary"
          >
            {t?.footerLinks?.termsandcondition}
          </Link>

        </div>
      </footer>
    </main>
  );
}
