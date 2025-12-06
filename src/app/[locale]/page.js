import TopComponentHome from '@/components/screenpages/TopComponentHome';
import { routing } from '../../i18n/routing';
import { redirect } from 'next/navigation';
import BlogPage from './blogpost/page';

export const metadata = {
  title: 'ExploretheBuzz - Your Source for Tech & Innovation Blogs',
  description:
    'Discover insightful articles about AI, ChatGPT, Gemini, technology, and innovation. Read expert blog posts and tutorials.',
  keywords:
    'blog, AI, ChatGPT, Gemini, technology, tutorials, innovation, web development',
  openGraph: {
    type: 'website',
    url: 'https://explorethebuzz.com',
    title: 'ExploretheBuzz - Your Source for Tech & Innovation Blogs',
    description:
      'Discover insightful articles about AI, ChatGPT, Gemini, technology, and innovation.',
    siteName: 'ExploretheBuzz',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ExploretheBuzz - Tech & Innovation Blogs',
    description:
      'Discover insightful articles about AI, ChatGPT, Gemini, technology, and innovation.',
  },
  alternates: {
    canonical: 'https://explorethebuzz.com',
  },
};

export default async function HomePage({ params }) {
  const parameter = await params;
  const locale = parameter.locale;

  if (!routing.locales.includes(locale)) {
    redirect(routing.defaultLocale);
  }

  return (
    <main className="min-h-screen  bg-gradient-to-br from-background to-muted font-sans">
      <TopComponentHome params={locale} />
      <BlogPage params={params} />
    </main>
  );
}
