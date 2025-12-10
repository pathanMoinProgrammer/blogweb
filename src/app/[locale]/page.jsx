// import Link from 'next/link';
// import Image from 'next/image';
// import { routing } from '../../i18n/routing';
// import { redirect } from 'next/navigation';
// import BlogPage from './blogpost/page';
// import { getTranslations } from '@/components/traslator';

// export const dynamic = 'force-static';
// export const revalidate = 300;

// export const currentDomain = 'https://www.explorethebuzz.com';

// export const metadata = {
//   title: 'ExploreTheBuzz – AI, ChatGPT & Next.js Blogs',
//   description: 'In-depth tutorials on AI, ChatGPT, Gemini, Next.js 14, React, Tailwind CSS, and Firebase. New articles weekly.',
//   alternates: { canonical: 'https://www.explorethebuzz.com' },
// };

// export default async function HomePage({ params }) {
//   const { locale } = await params;

//   if (!routing.locales.includes(locale)) redirect('/en');

//   const t = await getTranslations(locale, ['Homepage', 'Common']);
//   const t2 = await getTranslations(locale, 'Homepage');

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-background to-muted">
//       <section className="container mx-auto px-4 py-16 lg:py-28 hidden">
//         <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
//           <div className="text-center lg:text-left">
//             <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8">
//               Latest <span className="text-primary">AI, ChatGPT, Gemini</span> &{' '}
//               <span className="text-primary">Next.js</span> Blogs
//             </h1>

//             <div className="prose prose-lg dark:prose-invert text-muted-foreground space-y-5 text-left hidden">
//               <p>
//                 Welcome to <strong>ExploreTheBuzz</strong> — the fastest-growing blog for developers
//                 who want to stay ahead in artificial intelligence and modern web development.
//               </p>
//               <p>
//                 Every week we publish in-depth, no-fluff tutorials on the hottest topics:
//                 prompting techniques for ChatGPT and Gemini, Next.js 14 App Router best practices,
//                 React Server Components, performance optimization, authentication flows, Firebase 10,
//                 Tailwind CSS tricks, AI agents, RAG systems, and real-world deployment strategies.
//               </p>
//               <p>
//                 All articles are written by full-stack developers who actually ship production apps.
//                 No theory-only content — only battle-tested solutions you can copy-paste today.
//               </p>
//               <p>
//                 Whether you’re a beginner learning how to build your first AI-powered app or a senior
//                 engineer optimizing bundle size and Core Web Vitals, you’ll find step-by-step guides
//                 that save you hours of research.
//               </p>
//               <p>
//                 Join <strong>thousands of developers</strong> who improved their skills with our
//                 practical tutorials. New posts every Tuesday and Friday.
//               </p>
//             </div>

//             <div className="flex flex-wrap gap-5 justify-center lg:justify-start mt-10">
//               <Link
//                 href={`/${locale}/blogpost`}
//                 className="px-9 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:scale-105 transition text-lg"
//               >
//                 Read Latest Articles
//               </Link>
//               <Link
//                 href={`/${locale}/about`}
//                 className="px-9 py-4 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition text-lg"
//               >
//                 About ExploreTheBuzz
//               </Link>
//             </div>

//             <div className="flex justify-center lg:justify-start gap-5 mt-12">
//               <a
//                 href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.explorethebuzz.com&text=Latest%20AI%20%26%20Next.js%20blogs"
//                 target="_blank"
//                 rel="noopener"
//                 className="p-4 bg-[#1DA1F2] text-white rounded-full hover:scale-110 transition"
//                 aria-label="Twitter"
//               >
//                 X
//               </a>
//               <a
//                 href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.explorethebuzz.com"
//                 target="_blank"
//                 rel="noopener"
//                 className="p-4 bg-[#0A66C2] text-white rounded-full hover:scale-110 transition"
//                 aria-label="LinkedIn"
//               >
//                 LinkedIn
//               </a>
//               <a
//                 href="https://reddit.com/submit?url=https%3A%2F%2Fwww.explorethebuzz.com&title=ExploreTheBuzz%20–%20AI%20%26%20Next.js%20Blogs"
//                 target="_blank"
//                 rel="noopener"
//                 className="p-4 bg-[#FF4500] text-white rounded-full hover:scale-110 transition"
//                 aria-label="Reddit"
//               >
//                 Reddit
//               </a>
//             </div>
//           </div>

//           <div className="flex justify-center">
//             <Image
//               src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
//               alt="Developer writing AI and Next.js blog posts"
//               width={650}
//               height={650}
//               priority
//               className="rounded-2xl shadow-2xl"
//             />
//           </div>
//         </div>
//       </section>
//       <section className="container px-4 py-10 mx-auto lg:h-128 lg:space-x-8 lg:flex lg:items-center">
//       <div className="w-full text-center lg:text-left lg:w-1/2 lg:-mt-8">
//         <h2 className="text-3xl leading-snug text-gray-800 dark:text-gray-200 md:text-4xl">
//           {t2?.tagline1} <span className="font-semibold">{t2?.tagline2}</span>{' '}
//           {t2?.tagline3} <br className="hidden lg:block" /> {t2?.tagline4}{' '}
//           {/* <span className="font-semibold underline decoration-primary">
//               Tailwind CSS
//             </span> */}
//         </h2>
//         <p className="mt-4 text-lg text-gray-500 dark:text-gray-300">
//           {t2?.tagline5} <br className="hidden lg:block" /> {t2?.tagline6}{' '}
//           <a
//             href="https://appsnap.app/"
//             target="_blank"
//             rel="noopener noreferrer"
//             className="underline"
//           >
//             {t2?.tagline7}
//           </a>
//         </p>
//         <div className="mt-6 bg-transparent border rounded-lg dark:border-gray-700 lg:w-2/3 focus-within:border-primary focus-within:ring focus-within:ring-primary dark:focus-within:border-primary focus-within:ring-opacity-20"></div>
//       </div>
//       <div className="w-full mt-4 lg:mt-0 lg:w-1/2">
//         <img
//           src="https://www.creative-tim.com/twcomponents/svg/website-designer-bro-purple.svg"
//           alt="Website designer illustration"
//           className="w-full h-full max-w-md mx-auto"
//         />
//       </div>
//     </section>

//       <section className="py-20 ">
//         <div className=" mx-auto px-4">
//           <h2 className="text-4xl font-bold text-center mb-12">
//             Latest Articles & Tutorials
//           </h2>
//           <BlogPage params={params} />
//         </div>
//       </section>

//       <footer className="border-t py-12 mt-20 bg-background">
//         <div className="max-w-7xl mx-auto px-4 text-center space-x-6 text-muted-foreground">
//           <Link href={`/${locale}`} className="underline hover:text-primary">Home</Link>
//           <Link href={`/${locale}/blogpost`} className="underline hover:text-primary">All Blogs</Link>
//           <Link href={`/${locale}/about`} className="underline hover:text-primary">About</Link>
//           <Link href={`/${locale}/contact`} className="underline hover:text-primary">Contact</Link>
//           <Link href={`/${locale}/privacy-policy`} className="underline hover:text-primary">Privacy Policy</Link>
//           <Link href="/sitemap.xml" className="underline hover:text-primary">Sitemap</Link>
//         </div>
//       </footer>
//     </main>
//   );
// }

// import Link from 'next/link';
// import Image from 'next/image';
// import { routing } from '../../i18n/routing';
// import { redirect } from 'next/navigation';
// import BlogPage from './blogpost/page';
// import { getTranslations } from '@/components/traslator';

// export const dynamic = 'force-static';
// export const revalidate = 300;

// export const currentDomain = 'https://www.explorethebuzz.com';

// export const metadata = {
//   title: 'ExploreTheBuzz – AI, ChatGPT & Next.js Blogs',
//   description:
//     'In-depth tutorials on AI, ChatGPT, Gemini, Next.js 14, React, Tailwind CSS, and Firebase. New articles weekly.',
//   alternates: { canonical: 'https://www.explorethebuzz.com' },
// };

// export default async function HomePage({ params }) {
//   const { locale } = await params;

//   if (!routing.locales.includes(locale)) redirect('/en');

//   const t = await getTranslations(locale, ['Homepage', 'Common']);
//   const t2 = await getTranslations(locale, 'Homepage');

//   return (
//     <main className="min-h-screen bg-gradient-to-br from-background to-muted">
//       <section className="container mx-auto px-4 py-4 lg:py-8 ">
//         <div className=" gap-12 items-center  ">
//           <div className="text-center  ">
//             <h1 className="text-4xl text-left w-full md:text-5xl lg:text-6xl font-extrabold leading-tight mb-8">
//               Latest <span className="text-primary">AI, ChatGPT, Gemini</span> &{' '}
//               <span className="text-primary">Next.js</span> Blogs
//             </h1>

//             {/* SEO & AdSense-Friendly Educational Content — Visible to Users */}
//             <section className="container mx-auto px-4 py-8 max-w-3xl">
//               <h2 className="text-2xl font-bold text-left mb-4 text-muted-foreground">
//                 Why We Focus on AI, Web Development, and Responsible Crypto
//                 Innovation
//               </h2>
//               <div className="text-left text-muted-foreground space-y-4 text-sm md:text-base leading-relaxed">
//                 <p>
//                   At <strong>ExploreTheBuzz</strong>, we believe the future of
//                   technology lies at the intersection of artificial
//                   intelligence, modern web infrastructure, and ethical digital
//                   finance. While many blogs chase trends, we focus on teaching
//                   developers how to build systems that are not only cutting-edge
//                   but also secure, sustainable, and legally compliant.
//                 </p>
//                 <p>
//                   Our coverage of{' '}
//                   <strong>AI and large language models (LLMs)</strong> —
//                   including ChatGPT, Gemini, and open-source alternatives — goes
//                   beyond basic prompting. We explore how to build
//                   production-grade AI agents, implement retrieval-augmented
//                   generation (RAG) with real-time data, fine-tune models for
//                   domain-specific tasks, and deploy them efficiently using
//                   Next.js App Router and server actions. Every tutorial includes
//                   performance metrics, cost considerations, and security best
//                   practices.
//                 </p>
//                 <p>
//                   In parallel, we recognize that the rise of{' '}
//                   <strong>blockchain and cryptocurrency</strong> has created
//                   both opportunities and risks. That’s why we dedicate part of
//                   our content to helping developers and users navigate this
//                   space responsibly. We do not promote speculative trading or
//                   unverified projects. Instead, we focus on:
//                 </p>
//                 <ul className="list-disc pl-5 space-y-2">
//                   <li>
//                     How to identify and avoid common{' '}
//                     <strong>crypto scams</strong> (e.g., fake airdrops, phishing
//                     wallets, rug pulls)
//                   </li>
//                   <li>
//                     Evaluating blockchain projects based on code transparency,
//                     team credibility, and tokenomics
//                   </li>
//                   <li>
//                     Legal and tax-compliant ways to earn through{' '}
//                     <strong>play-to-earn (P2E) games</strong> and on-chain
//                     activities
//                   </li>
//                   <li>
//                     Building secure, self-custody integrations using Web3
//                     libraries and Firebase Auth
//                   </li>
//                 </ul>
//                 <p>
//                   We emphasize{' '}
//                   <strong>legal, sustainable earning methods</strong> because
//                   we’ve seen too many developers lose money—or worse, violate
//                   regulations—by jumping into gray-area schemes. Our guides on
//                   play-to-earn ecosystems only cover games with proven payouts,
//                   clear terms, and real user earnings. We also explain how to
//                   report crypto income properly to stay compliant with IRS and
//                   global tax standards.
//                 </p>
//                 <p>
//                   Additionally, we’re exploring how{' '}
//                   <strong>
//                     AI can automate and enhance trading strategies
//                   </strong>{' '}
//                   — not through “get-rich-quick bots,” but through transparent,
//                   backtested systems. We teach how to:
//                 </p>
//                 <ul className="list-disc pl-5 space-y-2">
//                   <li>Use AI to analyze on-chain data and social sentiment</li>
//                   <li>
//                     Build alert systems for wallet movements or protocol changes
//                   </li>
//                   <li>
//                     Integrate secure exchange APIs with proper rate limiting and
//                     2FA
//                   </li>
//                   <li>
//                     Deploy trading logic on serverless platforms without
//                     exposing keys
//                   </li>
//                 </ul>
//                 <p>
//                   All code examples are open, tested in staging environments,
//                   and include disclaimers about financial risk. We never
//                   guarantee profits — only educational value.
//                 </p>
//                 <p>
//                   Our <strong>Next.js and React content</strong> follows the
//                   same philosophy. Whether it’s optimizing Core Web Vitals,
//                   implementing secure authentication with Firebase 10, or
//                   structuring apps with React Server Components, we focus on
//                   patterns that scale in production. We test every tutorial on
//                   real hosting platforms (Vercel, AWS, etc.) and share
//                   performance benchmarks.
//                 </p>
//                 <p>
//                   Ultimately,{' '}
//                   <strong>
//                     ExploreTheBuzz exists to empower developers with clarity in
//                     a noisy tech landscape
//                   </strong>
//                   . We avoid hype, disclose limitations, and update content as
//                   tools evolve. Our goal isn’t virality — it’s becoming your
//                   trusted technical companion as you build the next generation
//                   of intelligent, secure, and user-respecting applications.
//                 </p>
//                 <p>
//                   New articles drop every <strong>Tuesday and Friday</strong>.
//                   Each one is crafted to save you hours of debugging, research,
//                   and risk — so you can focus on what matters: building.
//                 </p>
//               </div>
//             </section>

//             <div className="flex  flex-wrap gap-5  lg:justify-start mt-10">
//               <Link
//                 href={`/${locale}/blogpost`}
//                 className="px-9 py-4 bg-primary text-primary-foreground rounded-xl font-bold hover:scale-105 transition text-lg self-end"
//               >
//                 Read Latest Articles
//               </Link>
//               <Link
//                 href={`/${locale}/about`}
//                 className="px-9 py-4 border-2 border-primary text-primary rounded-xl font-bold hover:bg-primary hover:text-white transition text-lg self-end"
//               >
//                 About ExploreTheBuzz
//               </Link>
//             </div>

//             <div className="flex justify-center lg:justify-start gap-5 mt-12">
//               <a
//                 href="https://twitter.com/intent/tweet?url=https%3A%2F%2Fwww.explorethebuzz.com&text=Latest%20AI%20%26%20Next.js%20blogs"
//                 target="_blank"
//                 rel="noopener"
//                 className="p-4 bg-[#1DA1F2] text-white rounded-full hover:scale-110 transition"
//                 aria-label="Twitter"
//               >
//                 X
//               </a>
//               <a
//                 href="https://www.linkedin.com/sharing/share-offsite/?url=https%3A%2F%2Fwww.explorethebuzz.com"
//                 target="_blank"
//                 rel="noopener"
//                 className="p-4 bg-[#0A66C2] text-white rounded-full hover:scale-110 transition"
//                 aria-label="LinkedIn"
//               >
//                 LinkedIn
//               </a>
//               <a
//                 href="https://reddit.com/submit?url=https%3A%2F%2Fwww.explorethebuzz.com&title=ExploreTheBuzz%20–%20AI%20%26%20Next.js%20Blogs"
//                 target="_blank"
//                 rel="noopener"
//                 className="p-4 bg-[#FF4500] text-white rounded-full hover:scale-110 transition"
//                 aria-label="Reddit"
//               >
//                 Reddit
//               </a>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section className="py-20 ">
//         <div className=" mx-auto px-1">
//           <h2 className="text-4xl font-bold text-center mb-12">
//             Latest Articles & Tutorials
//           </h2>
//           <BlogPage params={params} />
//         </div>
//       </section>

//       <footer className="border-t py-12 mt-20 bg-background">
//         <div className="max-w-7xl mx-auto px-4 text-center space-x-6 text-muted-foreground">
//           <Link href={`/${locale}`} className="underline hover:text-primary">
//             Home
//           </Link>
//           <Link
//             href={`/${locale}/blogpost`}
//             className="underline hover:text-primary"
//           >
//             All Blogs
//           </Link>
//           <Link
//             href={`/${locale}/about`}
//             className="underline hover:text-primary"
//           >
//             About
//           </Link>
//           <Link
//             href={`/${locale}/contact`}
//             className="underline hover:text-primary"
//           >
//             Contact
//           </Link>
//           <Link
//             href={`/${locale}/privacy-policy`}
//             className="underline hover:text-primary"
//           >
//             Privacy Policy
//           </Link>
//           <Link href="/sitemap.xml" className="underline hover:text-primary">
//             Sitemap
//           </Link>
//         </div>
//       </footer>
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
  const t = await getTranslations(locale, ['Homepage', 'Common']);
  const t2 = await getTranslations(locale, 'Homepage');

  return (
    <main className="min-h-screen bg-gradient-to-br from-background to-muted">
      <section className="container mx-auto px-4 py-4 lg:py-8 ">
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
      </section>

      <section className="py-2 ">
        <div className=" px-1">
          <BlogPage params={params} />
        </div>
        {/* Bottom Section: Continued Educational Content */}
        <section className="container mx-auto px-4 py-8 ">
          <div className="text-left text-muted-foreground space-y-4 text-sm md:text-base leading-relaxed">
            <p>
              We emphasize <strong>legal, sustainable earning methods</strong>{' '}
              because we’ve seen too many developers lose money—or worse,
              violate regulations—by jumping into gray-area schemes. Our guides
              on play-to-earn ecosystems only cover games with proven payouts,
              clear terms, and real user earnings. We also explain how to report
              crypto income properly to stay compliant with IRS and global tax
              standards.
            </p>
            <p>
              Additionally, we’re exploring how{' '}
              <strong>AI can automate and enhance trading strategies</strong> —
              not through “get-rich-quick bots,” but through transparent,
              backtested systems. We teach how to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Use AI to analyze on-chain data and social sentiment</li>
              <li>
                Build alert systems for wallet movements or protocol changes
              </li>
              <li>
                Integrate secure exchange APIs with proper rate limiting and 2FA
              </li>
              <li>
                Deploy trading logic on serverless platforms without exposing
                keys
              </li>
            </ul>
            <p>
              All code examples are open, tested in staging environments, and
              include disclaimers about financial risk. We never guarantee
              profits — only educational value.
            </p>
            <p>
              Our <strong>Next.js and React content</strong> follows the same
              philosophy. Whether it’s optimizing Core Web Vitals, implementing
              secure authentication with Firebase 10, or structuring apps with
              React Server Components, we focus on patterns that scale in
              production. We test every tutorial on real hosting platforms
              (Vercel, AWS, etc.) and share performance benchmarks.
            </p>
          </div>
        </section>
      </section>

      <footer className="border-t py-12 mt-4 bg-background">
        <div className="max-w-7xl mx-auto px-4 text-center space-x-6 text-muted-foreground">
          <Link href={`/${locale}`} className="underline hover:text-primary">
            Home
          </Link>
          <Link
            href={`/${locale}/blogpost`}
            className="underline hover:text-primary"
          >
            All Blogs
          </Link>
          <Link
            href={`/${locale}/about`}
            className="underline hover:text-primary"
          >
            About
          </Link>
          <Link
            href={`/${locale}/contact`}
            className="underline hover:text-primary"
          >
            Contact
          </Link>
          <Link
            href={`/${locale}/privacy-policy`}
            className="underline hover:text-primary"
          >
            Privacy Policy
          </Link>
          <Link href="/sitemap.xml" className="underline hover:text-primary">
            Sitemap
          </Link>
        </div>
        {/* Footer Section: Closing Educational Content */}
        <div className="max-w-3xl mx-auto px-4 py-8 text-center text-muted-foreground text-sm md:text-base leading-relaxed">
          <p>
            Ultimately,{' '}
            <strong>
              ExploreTheBuzz exists to empower developers and Traders with
              clarity in a noisy tech landscape
            </strong>
            . We avoid hype, disclose limitations, and update content as tools
            evolve. Our goal isn’t virality — it’s becoming your trusted
            technical companion as you build the next generation of intelligent,
            secure, and user-respecting applications.
          </p>
          <p>
            New articles drop every <strong>Tuesday</strong>. Each
            one is crafted to save you hours of debugging, research, and risk —
            so you can focus on what matters: building.
          </p>
        </div>
      </footer>
    </main>
  );
}
