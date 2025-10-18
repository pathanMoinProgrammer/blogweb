import { Button } from '@/components/ui/button';
import Link from 'next/link';
import fs from 'fs';
import matter from 'gray-matter';
import { getTranslations } from '../traslator';

export async function BlogSection({ params }) {
  const locale = await params.locale;

  // Now read markdown files
  const dirContent = fs.readdirSync(`Blogs/${locale}`, 'utf-8');

  const blogs = dirContent.map((file) => {
    const blogContent = fs.readFileSync(`Blogs/${locale}/${file}`, 'utf-8');
    const { data } = matter(blogContent);

    // Locale-specific slug
    const slug = locale === 'en' ? data.enurl : data.hiurl;

    return { ...data, slug };
  });

  const t = await getTranslations(locale, 'BlogPage');

  return (
    <section className="py-16 px-4 bg-background">
      <div className="max-w-[80%] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            {t.TopBlogs}
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            {t.Discover}
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {blogs.map((blog, index) => (
            <Link href={`/${locale}/blogpost/${blog.slug}`} key={index}>
              <article
                // key={blog.slug}
                className="flex group hover:scale-105 flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-card shadow-sm hover:shadow-md transition-all duration-500"
              >
                <div className="h-full flex flex-col">
                  <img
                    src={blog.img}
                    alt={blog.title}
                    className="h-55 w-full object-cover group-hover:scale-110 transition-all"
                  />

                  <div className="p-6 flex flex-col flex-grow justify-between">
                    <div>
                      <time className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                        {blog.date}
                      </time>
                      <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
                        {blog.title?.slice(0, 25)}...
                      </h3>
                      <p className="mt-3 text-gray-600 dark:text-gray-400 line-clamp-3">
                        {(blog.excerpt || blog.description)?.slice(0, 50)}
                        {(blog.excerpt || blog.description)?.length > 50 &&
                          '...'}
                      </p>
                    </div>

                    <Button className="mt-4 h-auto text-sm font-medium text-indigo-600 dark:text-indigo-600 hover:text-purple-500/90 dark:hover:text-purple-600 hover:bg-white/5 transition-transform hover:scale-110 self-center cursor-pointer bg-white/80 px-[20px]">
                      Read more →
                    </Button>
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
