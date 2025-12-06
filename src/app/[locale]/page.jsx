import TopComponentHome from '@/components/screenpages/TopComponentHome';
import { routing } from '../../i18n/routing';
import { redirect } from 'next/navigation';
import BlogPage from './blogpost/page';

export const metadata = {
  title: 'ExploreTheBuzz – Tech, AI & Innovation Blogs',
  description: 'Read the latest articles on AI, ChatGPT, Gemini, web development and technology trends.',
  alternates: {
    canonical: 'https://explorethebuzz.com', // correct canonical
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
