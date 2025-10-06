// import matter from 'gray-matter';
// import Link from 'next/link';
// import React from 'react';
// import fs from 'fs';
// import { notFound } from 'next/navigation';
// import rehypeDocument from 'rehype-document';
// import rehypeFormat from 'rehype-format';
// import rehypeStringify from 'rehype-stringify';
// import remarkParse from 'remark-parse';
// import remarkRehype from 'remark-rehype';
// import { unified } from 'unified';
// import { reporter } from 'vfile-reporter';

// const page = async ({ params }) => {
//   let slug = await params.slug;

//   const filepath = `content/${slug}.md`;
//   if (!fs.existsSync(filepath)) {
//     notFound();
//   }
//   const filedata = fs.readFileSync(filepath, 'utf-8');

//   const { data, content } = matter(filedata);
//   const processor = unified()
//     .use(remarkParse)
//     .use(remarkRehype)
//     .use(rehypeDocument, { title: '👋🌍' })
//     .use(rehypeFormat)
//     .use(rehypeStringify);

//   const htmlContent = (await processor.process(content)).toString();

//   console.log(data, 'data', content, 'content');

//   return (
//     <article className="max-w-4xl mx-auto px-4 py-12 min-h-screen">
//       <section dangerouslySetInnerHTML={{ __html: htmlContent }}></section>

//       <footer className="mt-16 pt-8 border-t border-gray-200 dark:border-gray-700 text-center">
//         <Link
//           href="/blogpost"
//           className="inline-flex items-center px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition-colors duration-300 shadow-md hover:shadow-lg"
//         >
//           ← Back to Blogs
//         </Link>
//       </footer>
//     </article>
//   );
// };

// export default page;
import matter from 'gray-matter';
import Link from 'next/link';
import React from 'react';
import fs from 'fs';
import { notFound } from 'next/navigation';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import { unified } from 'unified';
import { reporter } from 'vfile-reporter';

const page = async ({ params }) => {
  let slug = await params.slug;

  const filepath = `content/${slug}.md`;
  if (!fs.existsSync(filepath)) {
    notFound();
  }
  const filedata = fs.readFileSync(filepath, 'utf-8');

  const { data, content } = matter(filedata);

  const processor = unified()
    .use(remarkParse)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify);

  const file = await processor.process(content);
  const htmlContent = String(file);
  console.log(reporter(file));

  return (
    <div className="min-h-screen bg-background">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <header className="mb-12">
          <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-6 leading-tight text-center">
            {data.title}
          </h1>
          
          <p className="text-xl text-muted-foreground mb-8 text-center max-w-3xl mx-auto">
            {data.description}
          </p>
          
          <div className="flex flex-wrap justify-center items-center gap-2 text-sm text-muted-foreground mb-8">
            <span className="font-medium">By {data.author}</span>
            <span>•</span>
            <time>{data.date}</time>
            <span>•</span>
            <span>{data.time}</span>
          </div>

          {data.img && (
            <div className="mb-8">
              <img
                src={data.img}
                alt={data.title}
                className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-2xl"
              />
            </div>
          )}
        </header>

        {/* Blog Series Name */}
        {data.name && (
          <div className="mb-10 text-center">
            <span className="inline-block bg-accent text-accent-foreground px-6 py-2 rounded-full text-lg font-semibold">
              {data.name}
            </span>
          </div>
        )}

        {/* Main Content - YE IMPORTANT HAI */}
        <section className="bg-card rounded-xl shadow-lg p-8 md:p-12 mb-12">
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </section>

        {/* Back Button */}
        <footer className="text-center">
          <Link
            href="/blogpost"
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            <span>Back to Blogs</span>
          </Link>
        </footer>
      </article>
    </div>
  );
};

export default page;