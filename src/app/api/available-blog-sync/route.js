// import { NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';

// export async function POST(request) {
//   try {
//     const { locale = 'en', slug } = await request.json();

//     if (!slug) {
//       return NextResponse.json({ error: 'Missing slug' }, { status: 400 });
//     }

//     const dirPath = path.join(process.cwd(), 'Blogs', locale);
//     const filePath = path.join(dirPath, `${slug}.md`);

//     const exists = fs.existsSync(filePath);

//     return NextResponse.json({ exists }, { status: 200 });
//   } catch (error) {
//     console.error('Error checking blog existence:', error);
//     return NextResponse.json(
//       { error: 'Failed to check blog', details: error.message },
//       { status: 500 }
//     );
//   }
// }





import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

/**
 * POST handler — checks if a blog URL (slug) exists.
 * Expected JSON: { locale: 'en', slug: 'my-blog-slug' }
 */
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

    // Check if file exists
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
