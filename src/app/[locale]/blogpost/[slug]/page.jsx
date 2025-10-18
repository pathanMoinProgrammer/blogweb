import matter from 'gray-matter';
import fs from 'fs';
import { notFound } from 'next/navigation';
import { unified } from 'unified';
import remarkParse from 'remark-parse';
import remarkRehype from 'remark-rehype';
import rehypeFormat from 'rehype-format';
import rehypeStringify from 'rehype-stringify';
import Link from 'next/link';
import { slugReadRef } from '@/firebase/firebaseAdminRefs';

const page = async ({ params }) => {
  const { locale, slug } = await params;
  const rowDataRef = await slugReadRef(slug).get();
  let data = {};

  const filepath = `Blogs/${locale}/${slug}.md`;
  if (rowDataRef.docs.length > 0) {
    rowDataRef.docs.forEach((gData) => (data = gData.data()));
  }
  
  const htmlContent = data.content;

  return (
    <div className="min-h-screen bg-background">
      <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
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
            <time>
              {data.updatedAt.toDate().toLocaleString('en-IN', {
                day: '2-digit',
                month: '2-digit',
                year: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                hour12: true,
              })}
            </time>
          </div>
          {data.imgUrl && (
            <div className="mb-8">
              <img
                src={data.imgUrl}
                alt={data.title}
                className="w-full h-auto max-h-[500px] object-cover rounded-xl shadow-2xl"
              />
            </div>
          )}
        </header>

        <section className="bg-card rounded-xl shadow-lg p-8 md:p-12 mb-12">
          <div
            className="prose-content"
            dangerouslySetInnerHTML={{ __html: htmlContent }}
          />
        </section>

        <footer className="text-center">
          <Link
            href={`/${locale}`}
            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded-lg shadow-md hover:shadow-xl transition-all duration-300 hover:scale-105"
          >
            <svg
              className="w-5 h-5"
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
            <span>Back to Blogs</span>
          </Link>
        </footer>
      </article>
    </div>
    // <div>page is working</div>
  );
};

export default page;
