import Link from 'next/link';
import Image from 'next/image';
import { routing } from '../../i18n/routing';
import { redirect } from 'next/navigation';
import BlogPage from './blogpost/page';
import { getTranslations } from '@/components/traslator';
import TopComponentHome from '@/components/screenpages/TopComponentHome';

export const dynamic = 'force-static';
export const revalidate = 300;
export const currentDomain = 'https://www.explorethebuzz.com';

export const metadata = {
  title: 'ExploreTheBuzz – AI, ChatGPT & Next.js Blogs',
  description:
    'In-depth tutorials on AI, ChatGPT, Gemini, Next.js 14, React, Tailwind CSS, and Firebase. New articles weekly.',
  alternates: {
    canonical: 'https://www.explorethebuzz.com',
  },
};

export default async function HomePage({ params }) {
  const { locale } = await params;
  if (!routing.locales.includes(locale)) redirect('/en');
  // const t = await getTranslations(locale, ['Homepage', 'Common']);
  const tRow = await getTranslations(locale, 'Homepage');
  const t = tRow.landingBottom || {};
  const t2 = await getTranslations(locale, 'Homepage');

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">
      {/* <section className="container mx-auto px-4 py-4 lg:py-8 ">
        <div className=" gap-12 items-center ">
          <div className="text-center ">
            <h1 className="text-3xl text-left w-full md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8">
              Latest <span className="text-primary">Crypto Currency</span>, With
              <span className="text-primary"> Ai Automation</span> +{' '}
              <span className="text-primary"> Earning</span> From Application &{' '}
              <span className="text-primary">Scam Awareness</span> Blogs
            </h1>
            <section className="container mx-auto px-4 py-8">
              <p> Why We Focus on Crypto, AI Automation & Scam Awareness</p>
              <div className="text-left text-muted-foreground space-y-4 text-sm md:text-base leading-relaxed">
                <p>
                  At <strong>ExploreTheBuzz</strong>, we’re building a trusted
                  resource for developers and tech-savvy users navigating the
                  fast-moving world of{' '}
                  <strong>
                    cryptocurrency, AI-driven automation, and digital security
                  </strong>
                  . While hype dominates much of the crypto space, we cut
                  through the noise with practical, legally sound guidance.
                </p>
                <p>
                  Our mission is simple: help you **earn safely**, **trade
                  intelligently**, and **build securely**. We cover{' '}
                  <strong>AI-powered trading automation</strong> — not with
                  magic-profit bots, but with transparent systems that analyze
                  on-chain data, monitor market sentiment, and execute
                  strategies using secure, server-side logic in Next.js and
                  Firebase.
                </p>
                <p>
                  Equally critical is <strong>scam awareness</strong>. As crypto
                  adoption grows, so do phishing schemes, fake play-to-earn
                  games, and deceptive “guaranteed return” projects. We teach
                  you how to:
                </p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>
                    Spot and avoid <strong>common crypto scams</strong> — from
                    fake wallet apps to social media impersonation
                  </li>
                  <li>
                    Verify legitimate{' '}
                    <strong>play-to-earn and game-fi opportunities</strong> that
                    actually pay out (and comply with tax laws)
                  </li>
                  <li>
                    Use blockchain explorers and contract analyzers to assess
                    project legitimacy before investing time or money
                  </li>
                </ul>
                <p>
                  Every guide is written by developers who actively use these
                  tools in real portfolios — not influencers selling dreams. We
                  emphasize <strong>legal, sustainable methods</strong> because
                  long-term success in crypto starts with safety and compliance.
                </p>
                <p>
                  Whether you’re automating trades with AI, researching your
                  next blockchain project, or learning how to protect your
                  digital assets, you’ll find no-fluff, battle-tested advice you
                  can apply today.
                </p>
              </div>
            </section>
            <div className="flex flex-wrap gap-5 lg:justify-start mt-10">
              <Link
                href={`/${locale}/blogpost`}
                className="px-9 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:scale-105 hover:bg transition-all duration-200 text-lg self-end"
                style={{ color: 'white' }}
              >
                Read Latest Articles
              </Link>
              <Link
                href={`/${locale}/about`}
                className="px-9 py-4 border border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition text-lg self-end"
              >
                About ExploreTheBuzz
              </Link>
            </div>
            <div className="flex justify-center lg:justify-start gap-5 mt-12">
              <a
                href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.explorethebuzz.com&text=Latest%20AI%20%26%20Next.js%20blogs"
                target="_blank"
                rel="noopener"
                className="p-4 bg-[#1DA1F2] text-white hover:opacity-80  rounded-full hover:scale-110 transition"
                style={{ color: 'white' }}
                aria-label="Twitter"
              >
                X
              </a>
              <a
                href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.explorethebuzz.com"
                target="_blank"
                rel="noopener"
                className="p-4 bg-[#0A66C2] text-white rounded-full hover:scale-110 transition"
                aria-label="LinkedIn"
                style={{ color: 'white' }}
              >
                LinkedIn
              </a>
              <a
                href="https://reddit.com/submit?url=https%3A%2F%2Fwww.explorethebuzz.com&title=ExploreTheBuzz%20–%20AI%20%26%20Next.js%20Blogs"
                target="_blank"
                rel="noopener"
                className="p-4 bg-[#FF4500] text-white rounded-full hover:scale-110 transition"
                aria-label="Reddit"
                style={{ color: 'white' }}
              >
                Reddit
              </a>
            </div>
          </div>
        </div>
      </section> */}

      <section>
        <section className="container px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
          <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
            <h2 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
              {t2?.tagline1}{' '}
              <span className="font-semibold">{t2?.tagline2}</span>{' '}
              {t2?.tagline3} <br className="hidden lg:block" /> {t2?.tagline4}{' '}
              {/* <span className="font-semibold underline decoration-primary">
              Tailwind CSS
            </span> */}
            </h2>
            <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
              {t2?.tagline5} <br className="hidden lg:block" /> {t2?.tagline6}{' '}
              <a
                href="https://appsnap.app/"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                {t2?.tagline7}
              </a>
            </p>
            <div className="mt-6 bg-transparent border rounded-lg dark:border-gray-700 lg:w-2/3 focus-within:border-primary focus-within:ring focus-within:ring-primary dark:focus-within:border-primary focus-within:ring-opacity-20"></div>
          </div>
          <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
            <img
              src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
              alt="Website designer illustration"
              className="w-full h-full max-w-md mx-auto"
            />
          </div>
        </section>
      </section>
      <section className="py-2 ">
        <div className=" px-1">
          <BlogPage params={params} />
        </div>
        {/* Bottom Section: Continued Educational Content */}
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
          <Link href={`/${locale}`} className="underline hover:text-primary">
            {t?.footerLinks?.home}
          </Link>
          <Link
            href={`/${locale}/blogpost`}
            className="underline hover:text-primary"
          >
            {t?.footerLinks?.allBlogs}
          </Link>
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
          <Link href="/sitemap.xml" className="underline hover:text-primary">
            {t?.footerLinks?.sitemap}
          </Link>
        </div>
      </footer>
    </main>
  );
}
