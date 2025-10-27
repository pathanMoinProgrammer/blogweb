import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export async function POST(request) {
  try {
    const { slug } = await request.json();

    if (!slug) {
      return NextResponse.json(
        { error: 'Missing required fields: slug.' },
        { status: 400 },
      );
    }

    const filePath = path.join(process.cwd(), 'Blogs', locale, `${slug}.md`);

    const exists = fs.existsSync(filePath);

    // const exists = true;

    return NextResponse.json({
      status: 200,
      error: null,
      exists,
      message: exists ? 'URL already exists' : 'URL available',
    });
  } catch (error) {
    console.error('❌ Error checking blog URL:', error);
    return NextResponse.json({
      error: 'Failed to check blog availability',
      details: error.message,
      status: 500,
    });
  }
}
