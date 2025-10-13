// import { NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';

// export async function POST(request) {
//   try {
//     const { locale, slug, content } = await request.json();
//     if (!locale || !slug || !content) {
//       return NextResponse.json(
//         { error: 'Missing required fields' },
//         { status: 400 }
//       );
//     }
//     const dirPath = path.join(process.cwd(), 'Blogs', locale);
//     if (!fs.existsSync(dirPath)) {
//       fs.mkdirSync(dirPath, { recursive: true });
//     }
//     const filePath = path.join(dirPath, `${slug}.md`);
//     if (fs.existsSync(filePath)) {
//       return NextResponse.json(
//         { error: 'Blog with this slug already exists' },
//         { status: 409 }
//       );
//     }
//     fs.writeFileSync(filePath, content, 'utf-8');
//     return NextResponse.json(
//       {
//         success: true,
//         message: 'Blog created successfully',
//         path: `Blogs/${locale}/${slug}.md`
//       },
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error('Error creating blog:', error);
//     return NextResponse.json(
//       { error: 'Failed to create blog', details: error.message },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
export async function POST(request) {
  try {
    const { locale, slug, content } = await request.json();

    if (!locale || !slug || !content) {
      return NextResponse.json(
        { error: 'Missing required fields: locale, slug, or content.' },
        { status: 400 },
      );
    }

    const dirPath = path.join(process.cwd(), 'Blogs', locale);

    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
    }

    const filePath = path.join(dirPath, `${slug}.md`);

    if (fs.existsSync(filePath)) {
      return NextResponse.json(
        { error: 'A blog with this slug already exists.', exists: true },
        { status: 409 },
      );
    }

    fs.writeFileSync(filePath, content, 'utf-8');

    return NextResponse.json(
      {
        success: true,
        message: '✅ Blog created successfully!',
        path: `Blogs/${locale}/${slug}.md`,
      },
      { status: 200 },
    );
  } catch (error) {
    console.error('❌ Error creating blog:', error);
    return NextResponse.json(
      {
        error: 'Failed to create blog file.',
        details: error.message,
      },
      { status: 500 },
    );
  }
}
