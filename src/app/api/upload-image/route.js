// import { NextResponse } from 'next/server';
// import fs from 'fs';
// import path from 'path';

// export const config = {
//   api: { bodyParser: false },
// };

// export async function POST(req) {
//   try {
//     const data = await req.formData();
//     const file = data.get('image');

//     if (!file || !file.name) {
//       return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     // ✅ Max 256 KB limit (256 * 1024 = 262144 bytes)
//     const MAX_SIZE = 256 * 1024;
//     if (buffer.length > MAX_SIZE) {
//       return NextResponse.json(
//         { error: 'File too large (max 256 KB allowed)' },
//         { status: 413 }
//       );
//     }

//     // ✅ Allow only JPG, PNG, WEBP
//     const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
//     if (!validTypes.includes(file.type)) {
//       return NextResponse.json(
//         { error: 'Invalid file type (only JPG, PNG, or WEBP allowed)' },
//         { status: 415 }
//       );
//     }

//     // ✅ Create upload directory if it doesn’t exist
//     const uploadDir = path.join(process.cwd(), 'public', 'uploads');
//     if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

//     // ✅ Clean and rename file
//     const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
//     const finalName = `${Date.now()}-${safeName}`;
//     const filePath = path.join(uploadDir, finalName);

//     // ✅ Save file
//     fs.writeFileSync(filePath, buffer);

//     // ✅ Return public file URL
//     return NextResponse.json(
//       { success: true, url: `/uploads/${finalName}` },
//       { status: 200 }
//     );
//   } catch (err) {
//     console.error('Upload error:', err);
//     return NextResponse.json(
//       { error: 'Internal server error while uploading image' },
//       { status: 500 }
//     );
//   }
// }

import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

export const config = {
  api: { bodyParser: false },
};

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get('image');

    if (!file || !file.name) {
      return NextResponse.json({ error: 'No image uploaded' }, { status: 400 });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const MAX_SIZE = 256 * 1024;
    if (buffer.length > MAX_SIZE) {
      return NextResponse.json(
        { error: 'File too large (max 256 KB allowed)' },
        { status: 413 },
      );
    }

    const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      return NextResponse.json(
        { error: 'Invalid file type (only JPG, PNG, or WEBP allowed)' },
        { status: 415 },
      );
    }

    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

    const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
    let finalName = safeName;
    let counter = 1;

    while (fs.existsSync(path.join(uploadDir, finalName))) {
      const ext = path.extname(safeName);
      const base = path.basename(safeName, ext);
      finalName = `${base}_${counter}${ext}`;
      counter++;
    }

    const filePath = path.join(uploadDir, finalName);

    fs.writeFileSync(filePath, buffer);

    return NextResponse.json(
      { success: true, url: `/uploads/${finalName}` },
      { status: 200 },
    );
  } catch (err) {
    console.error('Upload error:', err);
    return NextResponse.json(
      { error: 'Internal server error while uploading image' },
      { status: 500 },
    );
  }
}
