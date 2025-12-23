import Link from 'next/link';
import Image from 'next/image';
import Reactions from '@/components/ui/ReactionBtns';

function shuffleArray(array) {
  return [...array].sort(() => Math.random() - 0.5);
}

export default function BlogGrid({ blogs, locale, t }) {
  const shuffledBlogs = shuffleArray(blogs);

  return (
    <section className="py-16 px-4">
      <div className="max-w-8xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {shuffledBlogs.map((blog, index) => (
          <div
            key={blog.id}
            className="group rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all"
          >
            <div className="bg-white dark:bg-gray-800 flex flex-col h-full">
              <Link href={`/${locale}/blogpost/${blog.slug}`}>
                <div className="relative h-48 w-full">
                  <Image
                    src={blog.imgUrl}
                    alt={blog.title}
                    fill
                    priority={index === 0}
                    sizes="(max-width: 768px) 100vw, 25vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold mb-2 line-clamp-2">
                    {blog.title}
                  </h2>
                  <p className="text-sm text-muted-foreground line-clamp-3">
                    {blog.description}
                  </p>

                  <span className="mt-4 inline-block text-sm font-semibold text-blue-600">
                    {t?.readmore || 'Read More'} →
                  </span>
                </div>
              </Link>

              <div className="border-t p-3">
                <Reactions
                  slug={blog.slug}
                  postid={blog.id}
                  locale={locale}
                  reactionsArray={blog.reactions}
                />
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}