import React, { Suspense } from 'react';
import BlogPage from '@/components/ui/Blogpage';
import { getTranslations } from '@/components/traslator';

export default async function Page({ params }) {
  const parameters = await params;
  const locale = parameters.locale;
  const t = await getTranslations(locale, 'BlogPage');
  return (
    <section className="py-16 px-4 bg-linear-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen relative">
      <div className="max-w-380 mx-auto">
       <h1 className="text-3xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t.ourblogs || 'Latest Technology, AI & Innovation Blogs'}
        </h1>
        {/* <p className="text-xl md:text-2xl  text-muted-foreground  mx-auto mb-10 leading-relaxed">
          ExploreTheBuzz is the growing blog website for developers & Traders
          who want to stay ahead in artificial intelligence automation, Deep
          Knowledge of Crypto Currency. Every Tuesday , we publish
          in-depth, no-fluff tutorials and Knowledge Blogs written by full-stack
          engineers who actually deploy production apps — not theorists, not
          influencers.
          <br />
          <br />
          From building AI Auto Mation, to securing play-to-earn ecosystems and
          spotting crypto scams — we cover what actually matters in 2025.
          <br />
          <br />
          No sponsored fluff. No “get rich quick” promises. Just tested code,
          performance benchmarks, and honest takes on tools that work (and those
          that don’t).
          <br />
          <br />
          If you’re tired of shallow listicles and want content that saves you
          hours of debugging — you’re in the right place.
        </p> */}

        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 animate-pulse">
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  className="group transform rounded-xl transition-all duration-500"
                >
                  <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                    <div className="w-full h-48 bg-gray-300 dark:bg-gray-700" />

                    <div className="p-6 flex flex-col justify-between min-h-[200px]">
                      <div>
                        <div className="h-7 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-3" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full mb-2" />
                        <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-5/6 mb-4" />
                      </div>

                      <div className="h-10 bg-gray-300 dark:bg-gray-700 rounded w-1/2" />
                    </div>

                    <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40 py-3 flex items-center justify-center gap-3">
                      {Array.from({ length: 5 }).map((_, j) => (
                        <div
                          key={j}
                          className="h-8 w-8 rounded-full bg-gray-300 dark:bg-gray-700"
                        />
                      ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <BlogPage params={params} t={t} />
        </Suspense>
      </div>
    </section>
  );
}
