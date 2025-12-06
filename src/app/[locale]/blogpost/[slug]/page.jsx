// For Firebase Firestore blogs
import Link from 'next/link';
import { slugReadRef } from '@/firebase/firebaseAdminRefs';


export async function generateMetadata({ params }) {
  const { locale, slug } = await params;
  const rowDataRef = await slugReadRef(slug).get();
  let data = {};
  if (rowDataRef.docs.length > 0) {
    rowDataRef.docs.forEach((doc) => (data = doc.data()));
  }

  return {
    title: data?.title || 'ExploreTheBuzz',
    description:
      data?.description || 'Read the latest AI and web development blogs',
    alternates: {
      canonical: `https://www.explorethebuzz.com/${locale}/blogpost/${slug}`,
    },
    openGraph: {
      title: data?.title,
      description: data?.description,
      images: data?.imgUrl ? [data.imgUrl] : [],
      url: `https://www.explorethebuzz.com/${locale}/blogpost/${slug}`,
      type: 'article',
    },
  };
}

const page = async ({ params }) => {
  let url = 'https://explorethebuzz.com/';

  const { locale, slug } = await params;
  const currentUrl = `https://www.explorethebuzz.com/${locale}/blogpost/${slug}`;
  const rowDataRef = await slugReadRef(slug).get();
  let data = {};

  if (rowDataRef.docs.length > 0) {
    rowDataRef.docs.forEach((gData) => (data = gData.data()));
  }

  return (
    <div className="min-h-screen bg-background">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight text-center">
            {data?.title}
          </h1>
          <p className="text-xl text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
            {data?.description}
          </p>
          <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-muted-foreground mb-8">
            <span className="font-medium">By {data?.author}</span>
            <span>•</span>
            <time>
              {/* {data?.updatedAt?.toDate().toLocaleString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })} */}
              {data?.date} {data?.hhmm}
              {data.ampm}
            </time>
          </div>
          {data?.imgUrl && (
            <div className="mb-8">
              <img
                src={data?.imgUrl}
                alt={data?.title}
                className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-2xl"
              />
            </div>
          )}
        </header>

        <section className="bg-card rounded-xl shadow-lg p-8 md:p-12 mb-12">
          {data?.content && (
            <div
              className="prose-content"
              dangerouslySetInnerHTML={{ __html: data?.HtmContent }}
            />
          )}
        </section>

        <footer className="text-center ">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105 "
          >
            <svg
              className="w-5 h-5 dark:text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
            <span className="dark:text-white">Back to Blogs</span>
          </Link>
          <div className="flex justify-center gap-6 my-12">
            <a
              href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                currentUrl,
              )}&text=${encodeURIComponent(data?.title || '')}`}
              target="_blank"
              rel="noopener"
              className="p-4 bg-[#1DA1F2] text-white rounded-full hover:scale-110 transition"
              style={{ color: 'white' }}
            >
              Twitter
            </a>
            <a
              href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
                currentUrl,
              )}`}
              target="_blank"
              rel="noopener"
              className="p-4 bg-[#1877F2] text-white rounded-full hover:scale-110 transition"
              style={{ color: 'white' }}
            >
              Facebook
            </a>
            <a
              href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(
                currentUrl,
              )}&title=${encodeURIComponent(data?.title || '')}`}
              target="_blank"
              rel="noopener"
              className="p-4 bg-[#0A66C2] text-white rounded-full hover:scale-110 transition"
              style={{ color: 'white' }}
            >
              LinkedIn
            </a>
          </div>
        </footer>
      </article>
    </div>
    // <div>page is working</div>
  );
};

export default page;

// For Markdwon Fs Read Blogs

// import matter from 'gray-matter';
// import fs from 'fs';
// import path from 'path';
// import { notFound } from 'next/navigation';
// import { unified } from 'unified';
// import remarkParse from 'remark-parse';
// import remarkRehype from 'remark-rehype';
// import rehypeStringify from 'rehype-stringify';
// import Link from 'next/link';
// import { rehypeExternalLinks, rehypeFixImages } from '@/lib/rehypePlugins';

// export async function generateStaticParams() {
//   const basePath = path.join(process.cwd(), 'Blogs');

//   if (!fs.existsSync(basePath)) {
//     return [];
//   }

//   const entries = fs.readdirSync(basePath, { withFileTypes: true });
//   const locales = entries
//     .filter((entry) => entry.isDirectory() && !entry.name.startsWith('.'))
//     .map((entry) => entry.name);

//   const params = [];

//   locales.forEach((locale) => {
//     const dir = path.join(basePath, locale);
//     const files = fs.readdirSync(dir).filter((file) => file.endsWith('.md') && !file.startsWith('.'));

//     files.forEach((file) => {
//       const filePath = path.join(dir, file);
//       const content = fs.readFileSync(filePath, 'utf-8');
//       const { data } = matter(content);

//       if (data[`${locale}url`]) {
//         params.push({
//           locale,
//           slug: data[`${locale}url`],
//         });
//       }
//     });
//   });

//   return params;
// }

// export async function generateMetadata({ params }) {
//   const { locale, slug } = await params;

//   const blogsDir = path.join(process.cwd(), `Blogs/${locale}`);

//   if (!fs.existsSync(blogsDir)) {
//     return {
//       title: 'Blog Post | ExploretheBuzz',
//       description: 'Read our insightful blog post on ExploretheBuzz',
//     };
//   }

//   const files = fs.readdirSync(blogsDir).filter((file) => file.endsWith('.md'));

//   for (const file of files) {
//     const filePath = path.join(blogsDir, file);
//     const raw = fs.readFileSync(filePath, 'utf-8');
//     const { data } = matter(raw);

//     if (data[`${locale}url`] === slug) {
//       const url = `https://explorethebuzz.com/${locale}/blogpost/${slug}`;
//       const imageUrl = data.img || 'https://explorethebuzz.com/og-image.png';

//       return {
//         title: data.title || 'Blog Post | ExploretheBuzz',
//         description: data.description || 'Read our insightful blog post on ExploretheBuzz',
//         keywords: `${data.title}, blog, ExploretheBuzz, ${data.author || 'technology'}`,
//         authors: [{ name: data.author || 'ExploretheBuzz Team' }],
//         openGraph: {
//           type: 'article',
//           title: data.title,
//           description: data.description,
//           url,
//           siteName: 'ExploretheBuzz',
//           images: [{ url: imageUrl, width: 1200, height: 630, alt: data.title }],
//           publishedTime: data.date,
//           authors: [data.author || 'ExploretheBuzz Team'],
//           locale: locale === 'hi' ? 'hi_IN' : locale === 'es' ? 'es_ES' : locale === 'pt' ? 'pt_BR' : 'en_US',
//         },
//         twitter: {
//           card: 'summary_large_image',
//           title: data.title,
//           description: data.description,
//           images: [imageUrl],
//         },
//         alternates: {
//           canonical: url,
//         },
//         robots: {
//           index: true,
//           follow: true,
//           'max-image-preview': 'large',
//           'max-snippet': -1,
//         },
//       };
//     }
//   }

//   return {
//     title: 'Blog Post | ExploretheBuzz',
//     description: 'Read our insightful blog post on ExploretheBuzz',
//   };
// }

// export default async function BlogPage({ params }) {
//   const { locale, slug } = await params;

//   const blogsDir = path.join(process.cwd(), `Blogs/${locale}`);

//   if (!fs.existsSync(blogsDir)) {
//     notFound();
//   }

//   const files = fs.readdirSync(blogsDir).filter((file) => file.endsWith('.md') && !file.startsWith('.'));

//   let foundBlog = null;

//   for (const file of files) {
//     const filePath = path.join(blogsDir, file);
//     const raw = fs.readFileSync(filePath, 'utf-8');
//     const { data, content } = matter(raw);

//     if (data[`${locale}url`] === slug) {
//       const processor = unified()
//         .use(remarkParse)
//         .use(remarkRehype, { allowDangerousHtml: true })
//         .use(rehypeExternalLinks)
//         .use(rehypeFixImages)
//         .use(rehypeStringify, { allowDangerousHtml: true });

//       const processed = await processor.process(content);
//       const htmlContent = String(processed);

//       foundBlog = { ...data, htmlContent };
//       break;
//     }
//   }

//   if (!foundBlog) {
//     notFound();
//   }

//   const articleJsonLd = {
//     '@context': 'https://schema.org',
//     '@type': 'BlogPosting',
//     headline: foundBlog.title,
//     description: foundBlog.description,
//     image: foundBlog.img || 'https://explorethebuzz.com/og-image.png',
//     author: {
//       '@type': 'Person',
//       name: foundBlog.author || 'ExploretheBuzz Team',
//     },
//     datePublished: foundBlog.date,
//     mainEntityOfPage: {
//       '@type': 'WebPage',
//       '@id': `https://explorethebuzz.com/${locale}/blogpost/${slug}`,
//     },
//     publisher: {
//       '@type': 'Organization',
//       name: 'ExploretheBuzz',
//       logo: {
//         '@type': 'ImageObject',
//         url: 'https://explorethebuzz.com/logo.png',
//       },
//     },
//     inLanguage: locale,
//   };

//   return (
//     <div className="min-h-screen bg-background text-foreground">
//       <script
//         type="application/ld+json"
//         dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
//       />
//       <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
//         <header className="mb-4">
//           <h1 className="text-2xl md:text-3xl font-bold mb-2 leading-tight text-foreground">
//             {foundBlog.title}
//           </h1>
//           {foundBlog.description && (
//             <p className="text-base text-muted-foreground mb-3 max-w-3xl">
//               {foundBlog.description}
//             </p>
//           )}
//           <div className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground mb-4">
//             {foundBlog.author && (
//               <>
//                 <span className="font-medium">By {foundBlog.author}</span>
//                 <span>•</span>
//               </>
//             )}
//             {foundBlog.date && <time>{foundBlog.date}</time>}
//           </div>
//           {foundBlog.img && (
//             <div className="mb-4">
//               <img
//                 src={foundBlog.img}
//                 alt={foundBlog.title}
//                 className="w-full h-auto max-h-[400px] object-cover rounded-lg shadow-lg"
//               />
//             </div>
//           )}
//         </header>

//         <section className="bg-card rounded-xl shadow-md p-4 md:p-6 mb-6">
//           <div
//             className="prose-content max-w-none"
//             dangerouslySetInnerHTML={{ __html: foundBlog.htmlContent }}
//           />
//         </section>

//         <footer className="text-center">
//           <Link
//             href={`/${locale}/blogpost`}
//             className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-6 py-2 rounded-lg shadow-md hover:shadow-lg transition-all duration-300"
//           >
//             <svg
//               className="w-4 h-4"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M10 19l-7-7m0 0l7-7m-7 7h18"
//               />
//             </svg>
//             <span>Back to Blogs</span>
//           </Link>
//         </footer>
//       </article>
//     </div>
//   );
// }
