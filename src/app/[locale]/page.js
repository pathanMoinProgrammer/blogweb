import { BlogSection } from '@/components/screenpages/blogs';
import TopComponentHome from '@/components/screenpages/TopComponentHome';
import { Button } from '@/components/ui/button';
import { routing } from '../../i18n/routing';
import { redirect } from 'next/navigation';
// import { useTranslations } from 'next-intl';

export default async function HomePage({ params }) {

  const locale = await params.locale

  if (!routing.locales.includes(locale)) {
    redirect(routing.defaultLocale)
  }


  return (
    <main className="min-h-screen  bg-gradient-to-br from-background to-muted font-sans">
      <TopComponentHome params={locale} />
      <BlogSection params={params} />
    </main>
  );
}
