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
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-900 dark:text-white">
          {t.ourblogs || 'Latest Technology, AI & Innovation Blogs'}
        </h1>
        <p className="text-xl text-center text-muted-foreground max-w-4xl mx-auto mb-16">
          Discover in-depth articles, tutorials and practical guides on
          artificial intelligence, modern web development, ChatGPT, Gemini and
          the future of tech.
        </p>

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

// import Link from 'next/link';
// import fs from 'fs';
// import path from 'path';
// import matter from 'gray-matter';

// export const metadata = {
//   title: 'Our Blogs | BlogWeb - Tech & Innovation Articles',
//   description:
//     'Explore our collection of insightful blog posts about AI, ChatGPT, Gemini, web development, and technology tutorials.',
//   keywords: 'blogs, articles, technology, AI, ChatGPT, tutorials, innovation',
//   openGraph: {
//     title: 'Our Blogs | BlogWeb',
//     description:
//       'Explore our collection of insightful blog posts about technology and innovation.',
//     url: 'https://blogweb.com/blogpost',
//     type: 'website',
//   },
// };

// export default async function BlogListPage({ params }) {
//   const { locale } = await params;

//   const blogsDir = path.join(process.cwd(), `Blogs/${locale}`);
//   const files = fs.readdirSync(blogsDir).filter((file) => !file.startsWith('.'));

//   const blogs = files.map((fileName) => {
//     const filePath = path.join(blogsDir, fileName);
//     const fileContent = fs.readFileSync(filePath, 'utf-8');
//     const { data } = matter(fileContent);
//     const slug = data[`${locale}url`];

//     return {
//       title: data.title || 'Untitled',
//       description: data.description || '',
//       img: data.img || '',
//       date: data.date || '',
//       author: data.author || '',
//       slug,
//     };
//   });

//   return (
//     <section className="py-16 px-4 bg-background min-h-screen relative">
//       <div className="max-w-7xl mx-auto mt-10 relative z-10">
//         <h1 className="text-5xl font-bold text-center mb-16 text-foreground animate-fade-in">
//           Our Latest{' '}
//           <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-accent">
//             Blogs
//           </span>
//         </h1>

//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
//           {blogs.map((blog, index) => (
//             <Link key={index} href={`/${locale}/blogpost/${blog.slug}`}>
//               <div
//                 className="group bg-card dark:bg-gradient-to-br dark:from-white/5 dark:to-white/10 backdrop-blur-sm rounded-2xl shadow-lg overflow-hidden transform transition-all duration-500 hover:scale-105 hover:shadow-2xl hover:shadow-primary/20 border border-border dark:border-white/10 animate-slide-up h-full flex flex-col"
//                 style={{ animationDelay: `${index * 100}ms` }}
//               >
//                 {/* BLOG IMAGE with overlay */}
//                 <div className="relative overflow-hidden h-52">
//                   {blog.img ? (
//                     <img
//                       src={blog.img}
//                       alt={blog.title}
//                       className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
//                     />
//                   ) : (
//                     <div className="w-full h-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
//                       <svg
//                         className="w-16 h-16 text-muted-foreground/50"
//                         fill="none"
//                         stroke="currentColor"
//                         viewBox="0 0 24 24"
//                       >
//                         <path
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth={1.5}
//                           d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"
//                         />
//                       </svg>
//                     </div>
//                   )}
//                   <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
//                 </div>

//                 {/* BLOG DETAILS */}
//                 <div className="p-6 flex flex-col flex-grow">
//                   <h2 className="text-xl font-bold mb-3 text-foreground line-clamp-2 group-hover:text-primary transition-colors duration-300">
//                     {blog.title}
//                   </h2>

//                   <p className="text-muted-foreground text-sm mb-4 flex-grow line-clamp-3 leading-relaxed">
//                     {blog.description}
//                   </p>

//                   <div className="flex items-center justify-between mt-auto pt-4 border-t border-border dark:border-white/10">
//                     <span className="text-primary font-semibold text-sm group-hover:text-primary/80 transition-colors duration-300">
//                       Read More
//                     </span>
//                     <svg
//                       className="w-5 h-5 text-primary transform group-hover:translate-x-2 transition-transform duration-300"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M13 7l5 5m0 0l-5 5m5-5H6"
//                       />
//                     </svg>
//                   </div>
//                 </div>

//                 {/* Hover glow effect */}
//                 <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
//                   <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-accent/10"></div>
//                 </div>
//               </div>
//             </Link>
//           ))}
//         </div>
//       </div>
//     </section>
//   );
// }
