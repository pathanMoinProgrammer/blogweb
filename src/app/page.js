import { BlogSection } from '@/components/screenpages/blogs';
import PricingComponent from '@/components/screenpages/pricing';
import TopComponentHome from '@/components/screenpages/TopComponentHome';
import { Button } from '@/components/ui/button';

export default function HomePage() {
  const posts = [
    {
      id: 1,
      title: 'Welcome to My Blog',
      summary: 'This is the first post on my new blog website.',
    },
    {
      id: 2,
      title: 'Getting Started',
      summary: 'How to start your own blog using React.',
    },
  ];

  return (
    <main className="min-h-screen  bg-gradient-to-br from-background to-muted font-sans">
      <TopComponentHome />
      <PricingComponent />
      <BlogSection />
    </main>
  );
}
