import { Button } from '@/components/ui/button';
import Link from 'next/link';

export function BlogSection() {
  const blogs = [
    {
      id: 1,
      date: 'May 12, 2024',
      title: 'Welcome to My Blog',
      excerpt:
        'This is the first post on my new blog website. Learn how to get started with blogging using modern tools.',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSJBkIqCE9iDCKu9dmNzTojb_j-vv7Z2OvYOw&s',
      url:"/blogpost",
    },
    {
      id: 2,
      date: 'Apr 28, 2024',
      title: 'Getting Started with React',
      excerpt:
        'How to start your own blog using React and Tailwind CSS. A step-by-step guide for beginners.',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLGcoc8elsE40wC0KRSyFdXeg_tlk8KhjPdA&s',
      url:"/blogpost",
    },
    {
      id: 3,
      date: 'Mar 15, 2024',
      title: 'Earn 11: The Future of Earning Apps',
      excerpt:
        'Explore how apps like Earn 11 are changing the way users earn money through surveys and feedback.',
      img: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTCOiJ31O4aRV_KhVwz-zur9lYHSej05K5iIg&s',
      url:"/blogpost",
    },
    {
      id: 4,
      date: 'Feb 3, 2024',
      title: 'Web3 and Cryptocurrency Wallets',
      excerpt:
        'Learn how to integrate Web3 modal components for seamless crypto wallet connections in your apps.',
      img: 'https://t3.ftcdn.net/jpg/02/39/50/30/240_F_239503004_ByNsatpxpDpTDVtEzWYUGM4SmGlbMJzN.jpg',
      url:"/blogpost",
    },
  ];

  return (
    <section className="py-16 px-4 bg-background ">
      <div className="max-w-[80%] mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
            Top Blogs
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Discover the most popular articles from our community of writers and
            experts.
          </p>
        </div>

        <div
          className={`grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8  `}
        >
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="flex group hover:scale-105  flex-col overflow-hidden rounded-xl border border-gray-200 dark:border-gray-800 bg-card shadow-sm hover:shadow-md transition-all duration-500"
            >
               <a href={blog.url}>
              <img
                src={blog.img}
                alt={blog.title}
                className="h-55 w-full object-cover group-hover:scale-110 transition-all "
              />
              <div className="p-6 flex flex-col flex-grow">
                <time className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">
                  {blog.date}
                </time>
                <h3 className="mt-2 text-xl font-semibold text-gray-900 dark:text-white line-clamp-2">
                  {blog.title}
                </h3>
                <p className="mt-3 text-gray-600 dark:text-gray-400 flex-grow line-clamp-3">
                  {blog.excerpt}
                </p>
                <Button
                  // variant="link"
                  className="mt-4 h-auto text-sm font-medium text-indigo-600 dark:text-indigo-600 hover:text-purple-500/90  dark:hover:text-purple-600 max-w-[40%] hover:bg-white/5 transition-transform hover:scale-x-125 hover:scale-y-125 self-center cursor-pointer bg-white/80 px-[20px] "
                >
                 Read more →
                </Button>
              </div>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
