import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

export default function RootPage() {
  // Redirect happens instantly, but crawlers still see this content
  redirect('/en');

  // Visible to Googlebot, Bingbot, etc. — helps with indexing
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-8">
      <div className="text-center max-w-4xl">
        <h1 className="text-5xl font-bold mb-8">ExploreTheBuzz – AI & Next.js Blog</h1>
        <p className="text-xl leading-relaxed text-muted-foreground">
          ExploreTheBuzz is a technical blog for developers building production AI applications, 
          modern web apps with Next.js 14+, and safe cryptocurrency tools. 
          We publish in-depth tutorials every Tuesday  covering ChatGPT, Gemini, 
          RAG systems, React Server Components, Firebase security, crypto scam prevention, 
          and play-to-earn ecosystems — all with working code, live demos, and real-world benchmarks. 
          No sponsored content. No financial advice. Just battle-tested engineering.
        </p>
        <p className="mt-8 text-lg">
          Redirecting you to English version...
        </p>
      </div>
    </div>
  );
}