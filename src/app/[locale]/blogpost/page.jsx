import Link from 'next/link';
import fs from 'fs';
import matter from 'gray-matter';
import CreateBlog from '@/components/screenpages/createblog';
import { Plus } from 'lucide-react';

export default function BlogPage({ params }) {
  const locale = params.locale;

  // Read all markdown files for the current locale
  const dirContent = fs.readdirSync(`Blogs/${locale}`, 'utf-8');

  const blogs = dirContent.map((file) => {
    const blogContent = fs.readFileSync(`Blogs/${locale}/${file}`, 'utf-8');
    const { data } = matter(blogContent);

    // Use locale-specific slug
    const slug = locale === 'en' ? data.enurl : data.hiurl;

    return { ...data, slug };
  });

  return (
    <section className="py-16 px-4 bg-gradient-to-b from-white to-gray-100 dark:from-gray-900 dark:to-gray-800 min-h-screen">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-12 text-gray-900 dark:text-white animate-fade-in">
          Our Latest Blogs
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          <Link href={`/en/create-new-blog`}>
            <Plus />
            Create Blog
          </Link>
          {blogs.map((blog, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <img
                src={blog.img}
                alt={blog.title}
                className="w-full h-48 object-cover transition-transform duration-300 hover:scale-110"
              />

              <div className="p-6 flex flex-col">
                <h2 className="text-2xl font-semibold mb-3 text-gray-900 dark:text-white line-clamp-1">
                  {blog.title}
                </h2>

                <p className="text-gray-600 dark:text-gray-300 mb-4 flex-grow line-clamp-3">
                  {blog.description}
                </p>

                <Link href={`/${locale}/blogpost/${blog.slug}`}>
                  <button className="bg-blue-600 dark:bg-blue-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-blue-700 dark:hover:bg-blue-600 transition-colors duration-300">
                    Read More
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
