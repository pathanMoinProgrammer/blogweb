import { NextResponse } from 'next/server';
import { getCachedLangPosts } from '@/components/blog/blogpost';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const lang = searchParams.get('lang') || 'en';

  try {
    const blogs = await getCachedLangPosts(lang);

    // homepage ke liye lightweight data
    const lightBlogs = blogs.map(b => ({
      id: b.id,
      slug: b.slug,
      title: b.title,
      description: b.description,
      imgUrl: b.imgUrl,
      timetoread: b.timetoread,
      reactions: b.reactions ?? [],
    }));

    return NextResponse.json(lightBlogs, {
      headers: {
        'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=600',
      },
    });
  } catch (err) {
    return NextResponse.json({ error: 'Failed to load blogs' }, { status: 500 });
  }
}
