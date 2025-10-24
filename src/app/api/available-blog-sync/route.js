
import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { locale, slug } = await request.json();

    if (!locale || !slug) {
      return NextResponse.json(
        { error: 'Missing required fields: locale or slug.' },
        { status: 400 }
      );
    }

    const filePath = path.join(process.cwd(), 'Blogs', locale, `${slug}.md`);

    const exists = fs.existsSync(filePath);

    return NextResponse.json(
      { exists, message: exists ? 'URL already exists' : 'URL available' },
      { status: 200 }
    );
  } catch (error) {
    console.error('❌ Error checking blog URL:', error);
    return NextResponse.json(
      { error: 'Failed to check blog availability', details: error.message },
      { status: 500 }
    );
  }
}
