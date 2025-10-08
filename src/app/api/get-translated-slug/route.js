import matter from 'gray-matter';
import fs from 'fs';
import { NextResponse } from 'next/server';

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const slug = searchParams.get('slug');
  const locale = searchParams.get('locale');
  const targetLocale = searchParams.get('targetLocale');

  try {
    const filepath = `Blogs/${locale}/${slug}.md`;
    
    if (!fs.existsSync(filepath)) {
      return NextResponse.json({ error: 'Post not found' }, { status: 404 });
    }

    const filedata = fs.readFileSync(filepath, 'utf-8');
    const { data } = matter(filedata);

    const translatedSlug = targetLocale === 'en' ? data.enurl : data.hiurl;

    return NextResponse.json({ translatedSlug });
  } catch (error) {
    return NextResponse.json({ error: 'Error reading file' }, { status: 500 });
  }
}