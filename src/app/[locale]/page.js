import { BlogSection } from '@/components/screenpages/blogs';
import TopComponentHome from '@/components/screenpages/TopComponentHome';
import { routing } from '../../i18n/routing';
import { redirect } from 'next/navigation';
import { getOrSetRandomUID } from '@/lib/randomId';
import BlogPage from './blogpost/page';

export default async function HomePage({ params }) {

  const locale = await params.locale

  if (!routing.locales.includes(locale)) {
    redirect(routing.defaultLocale)
  }


  return (
    <main className="min-h-screen  bg-gradient-to-br from-background to-muted font-sans">
      <TopComponentHome params={locale} />
      <BlogPage params={params} />
    </main>
  );
}
