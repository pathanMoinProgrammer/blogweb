
import Link from 'next/link';
import Reactions from '@/components/ui/ReactionBtns';
import { getCachedLangPosts } from '../blog/blogpost';
import { languages } from '@/lib/availableLangs';
import { getTranslations } from '../traslator';

export default async function BlogPage({ params, t }) {
  const param = await params;
  const locale = param.locale;
  const blogs = await getCachedLangPosts(locale);
  const currentlang = languages.find((item) => {
    if (item.code === locale) {
      return item.label;
    }
  });


  return (
    <section className="py-16 px-4 min-h-screen">
      <div className="max-w-8xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {blogs.length > 0 ? (
            blogs?.map((blog, index) => (
              <div
                key={blog.id || index}
                className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 hover:scale-105"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="bg-white dark:bg-gray-800 rounded-xl flex flex-col h-full">
                  <Link
                    href={`/${locale}/blogpost/${blog.slug}`}
                    className="flex flex-col flex-grow"
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <img
                        src={blog.imgUrl}
                        alt={blog.title}
                        className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                      />
                      {blog?.timetoread && blog.timetoread !== '' && (
                        <span className="absolute top-3 right-3 px-3 py-1 text-xs rounded-full bg-black/70 text-white backdrop-blur-md">
                          {blog.timetoread} read
                        </span>
                      )}
                    </div>

                    <div className="p-6 flex flex-col flex-grow">
                      <h2 className="text-xl font-bold text-gray-900 dark:text-white line-clamp-3 hover:text-blue-600 dark:hover:text-blue-400 transition-colors leading-tight mb-3">
                        {blog.title}
                      </h2>

                      <p className="text-gray-600 dark:text-gray-300 text-sm md:text-base line-clamp-2 lg:line-clamp-3 flex-grow">
                        {blog.description || 'No description available.'}
                      </p>

                      <div className="mt-6">
                        <button className="inline-block bg-blue-600 text-white font-semibold py-2.5 px-5 rounded-lg hover:bg-blue-700 transition-colors text-sm">
                          {t.readmore || 'Read More'} →
                        </button>
                      </div>
                    </div>
                  </Link>

                  <div className="mt-auto border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/50 py-3 px-6">
                    <Reactions
                      slug={blog.slug}
                      postid={blog.id}
                      locale={locale}
                      reactionsArray={blog?.reactions}
                    />
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center col-span-4 text-gray-500 dark:text-gray-400">
             {t.noBlogs || `No blogs available for ${currentlang?.label || ''}.`}
            </p>
          )}
        </div>
      </div>
    </section>
  );
}
