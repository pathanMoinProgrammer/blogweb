import Link from 'next/link';
import Reactions from '@/components/ui/ReactionBtns';
import { getCachedLangPosts } from '../blog/blogpost';

export default async function BlogPage({ params, t }) {
  const param = await params;
  const locale = param.locale;

  const blogs = await getCachedLangPosts(locale);


  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen relative ">
      <div className="max-w-380 mx-auto ">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {blogs?.map((blog, index) => (
            <div
              key={index}
              className="group transform rounded-xl transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden">
                <Link
                  href={`/${locale}/blogpost/${blog.slug}`}
                  className="block"
                >
                  <img
                    src={blog.imgUrl}
                    alt={blog.title}
                    className="w-full h-48 object-cover transition-transform duration-300 group-hover:scale-110"
                  />

                  <div className="p-6 flex flex-col justify-between min-h-[200px]">
                    <div>
                      <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white line-clamp-1">
                        {blog.title}
                      </h2>

                      <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
                        {blog.description}
                      </p>
                    </div>

                    <button className="bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 cursor-pointer transition-colors duration-300">
                      {t.readmore}
                    </button>
                  </div>
                </Link>

                <div className="border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-900/40  py-3 flex items-center justify-center">
                  <Reactions
                    slug={blog.slug}
                    postid={blog.id}
                    locale={locale}
                    reactionsArray={blog?.reactions}
                  />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

