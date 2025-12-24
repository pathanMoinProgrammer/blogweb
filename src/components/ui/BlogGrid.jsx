"use client"
import Link from 'next/link';
import { useState, useEffect } from 'react';
import Reactions from '@/components/ui/ReactionBtns';

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function BlogGrid({ blogs, locale, t }) {
  const [shuffledBlogs, setShuffledBlogs] = useState([]);

  useEffect(() => {
    if (blogs && blogs.length > 0) {
      setShuffledBlogs(shuffleArray(blogs));
    }
  }, [blogs]);

  if (!shuffledBlogs.length) return null;

  return (
    <section className="py-16 px-4">
      <div className="max-w-[90rem] mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {shuffledBlogs.map((blog, index) => (
          <div
            key={blog?.id}
            className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
          >
            <div className="bg-white dark:bg-gray-800 flex flex-col h-full">
              <Link href={`/${locale}/blogpost/${blog.slug}`}>
                <div className="relative h-48 w-full">
                  <img
                    src={blog?.imgUrl}
                    alt={blog?.title}
                    className="w-full h-full object-cover"
                    width="400"
                    height="192"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-2 line-clamp-2">
                    {blog?.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-1">
                    {blog?.description}
                  </p>

                  <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                    {t?.readmore || 'Read More'} →
                  </span>
                </div>
              </Link>

              <div className="border-t border-gray-200 dark:border-gray-700 bg-gradient-to-r from-gray-50/50 to-white/50 dark:from-gray-800/50 dark:to-gray-900/50 p-4 flex justify-center items-center backdrop-blur-sm">
                <Reactions
                  slug={blog?.slug}
                  postid={blog?.id}
                  locale={locale}
                  reactionsArray={blog?.reactions}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}