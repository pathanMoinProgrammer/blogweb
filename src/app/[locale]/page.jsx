import TopComponentHome from '@/components/screenpages/TopComponentHome';
// import { routing } from '../../i18n/routing';
// import { redirect } from 'next/navigation';
// import BlogPage from './blogpost/page';

// export const metadata = {
//   title: 'ExploreTheBuzz – Tech, AI & Innovation Blogs',
//   description: 'Read the latest articles on AI, ChatGPT, Gemini, web development and technology trends.',
//   alternates: {
//     canonical: 'https://explorethebuzz.com', // correct canonical
//   },
// };

// export default async function HomePage({ params }) {
//   const parameter = await params;
//   const locale = parameter.locale;

//   if (!routing.locales.includes(locale)) {
//     redirect(routing.defaultLocale);
//   }

//   return (
//     <main className="min-h-screen  bg-gradient-to-br from-background to-muted font-sans">
//       <TopComponentHome params={locale} />
//       <BlogPage params={params} />
//       {/* <a href="https://www.seobility.net/en/seocheck/check?url=https%3A%2F%2Fexplorethebuzz.com%2Fen"><img src="https://app.seobility.net/widget/widget.png?url=https%3A%2F%2Fexplorethebuzz.com%2Fen" alt="Seobility Score for explorethebuzz.com" /></a> */}
//     </main>
//   );
// }





import Link from 'next/link';
import Image from 'next/image';
import { routing } from '../../i18n/routing';
import { redirect } from 'next/navigation';
import BlogPage from './blogpost/page';
import { getTranslations } from '@/components/traslator';

export const dynamic = 'force-static';
export const revalidate = 300;

export const currentDomain = 'https://www.explorethebuzz.com';

export const metadata = {
  title: 'ExploreTheBuzz – Latest AI, ChatGPT, Gemini & Next.js Blogs',
  description:
    'In-depth tutorials on artificial intelligence, ChatGPT, Gemini, Next.js 14 App Router, React 19, Tailwind CSS, Firebase and modern web development. New articles every week.',
  alternates: {
    canonical: currentDomain,
  },
};

export default async function HomePage({ params }) {
  const { locale } = await params;

  if (!routing.locales.includes(locale)) redirect('/en');

  const t = await getTranslations(locale, ['Homepage', 'Common']);
  const t2 = await getTranslations(locale, 'Homepage');
  

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">
      <section className="container mx-auto px-4 py-16 lg:py-28 hidden">
        <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
          <div className="text-center lg:text-left">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8">
              Latest <span className="text-primary">AI, ChatGPT, Gemini</span> &{' '}
              <span className="text-primary">Next.js</span> Blogs
            </h1>

            <div className="prose prose-lg dark:prose-invert text-muted-foreground space-y-5 text-left hidden">
              <p>
                Welcome to <strong>ExploreTheBuzz</strong> — the fastest-growing blog for developers
                who want to stay ahead in artificial intelligence and modern web development.
              </p>
              <p>
                Every week we publish in-depth, no-fluff tutorials on the hottest topics:
                prompting techniques for ChatGPT and Gemini, Next.js 14 App Router best practices,
                React Server Components, performance optimization, authentication flows, Firebase 10,
                Tailwind CSS tricks, AI agents, RAG systems, and real-world deployment strategies.
              </p>
              <p>
                All articles are written by full-stack developers who actually ship production apps.
                No theory-only content — only battle-tested solutions you can copy-paste today.
              </p>
              <p>
                Whether you’re a beginner learning how to build your first AI-powered app or a senior
                engineer optimizing bundle size and Core Web Vitals, you’ll find step-by-step guides
                that save you hours of research.
              </p>
              <p>
                Join <strong>thousands of developers</strong> who improved their skills with our
                practical tutorials. New posts every Tuesday and Friday.
              </p>
            </div>


            <div className="flex flex-wrap gap-5 justify-center lg:justify-start mt-10 hidden">
              <Link
                href={`/${locale}/blogpost`}
                className="px-9 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:scale-105 transition text-lg"
              >
                Read Latest Articles
              </Link>
              <Link
                href={`/${locale}/about`}
                className="px-9 py-4 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition text-lg"
              >
                About ExploreTheBuzz
              </Link>
            </div>


            <div className="flex justify-center lg:justify-start gap-5 mt-12">
              <a
                href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.explorethebuzz.com&text=Latest%20AI%20%26%20Next.js%20blogs"
                target="_blank"
                rel="noopener"
                className="p-4 bg-[#1DA1F2] text-white rounded-full hover:scale-110 transition"
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
              >
                LinkedIn
              </a>
              <a
                href="https://reddit.com/submit?url=https%3A%2F%2Fwww.explorethebuzz.com&title=ExploreTheBuzz%20–%20AI%20%26%20Next.js%20Blogs"
                target="_blank"
                rel="noopener"
                className="p-4 bg-[#FF4500] text-white rounded-full hover:scale-110 transition"
                aria-label="Reddit"
              >
                Reddit
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <Image
              src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
              alt="Developer writing AI and Next.js blog posts"
              width={650}
              height={650}
              priority
              className="rounded-2xl shadow-2xl"
            />
          </div>
        </div>
      </section>
      <section className="container px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
      <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
        <h2 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
          {t2?.tagline1} <span className="font-semibold">{t2?.tagline2}</span>{' '}
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


      <section className="py-20 ">
        <div className=" mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">
            Latest Articles & Tutorials
          </h2>
          <BlogPage params={params} />
        </div>
      </section>

      <footer className="border-t py-12 mt-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 text-center space-x-6 text-muted-foreground">
          <Link href={`/${locale}`} className="underline hover:text-primary">Home</Link>
          <Link href={`/${locale}/blogpost`} className="underline hover:text-primary">All Blogs</Link>
          <Link href={`/${locale}/about`} className="underline hover:text-primary">About</Link>
          <Link href={`/${locale}/contact`} className="underline hover:text-primary">Contact</Link>
          <Link href={`/${locale}/privacy-policy`} className="underline hover:text-primary">Privacy Policy</Link>
          <Link href="/sitemap.xml" className="underline hover:text-primary">Sitemap</Link>
        </div>
      </footer>
    </main>
  );
}