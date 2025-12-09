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
//     const MAX_SIZE = 256 * 1024;
//     if (buffer.length > MAX_SIZE) {
//       return NextResponse.json(
//         { error: 'File too large (max 256 KB allowed)' },
//         { status: 413 },
//       );
//     }{}
//     const validTypes = ['image/jpeg', 'image/png', 'image/webp'];
//     if (!validTypes.includes(file.type)) {
//       return NextResponse.json(
//         { error: 'Invalid file type (only JPG, PNG, or WEBP allowed)' },
//         { status: 415 },
//       );
//     }
//     const uploadDir = path.join(process.cwd(), 'public', 'uploads');
//     if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
//     const safeName = file.name.replace(/[^a-zA-Z0-9_.-]/g, '_');
//     let finalName = safeName;
//     let counter = 1;
//     while (fs.existsSync(path.join(uploadDir, finalName))) {
//       const ext = path.extname(safeName);
//       const base = path.basename(safeName, ext);
//       finalName = `${base}_${counter}${ext}`;
//       counter++;
//     }
//     const filePath = path.join(uploadDir, finalName);
//     fs.writeFileSync(filePath, buffer);
//     return NextResponse.json(
//       { success: true, url: `/uploads/${finalName}` },
//       { status: 200 },
//     );
//   } catch (err) {
//     console.error('Upload error:', err);
//     return NextResponse.json(
//       { error: 'Internal server error while uploading image' },
//       { status: 500 },
//     );
//   }
// }

// import { writeFile, mkdir } from "fs/promises";
// import path from "path";

// export async function POST(req) {
//   try {
//     const data = await req.formData();
//     const file = data.get("file"); // single file
//     const slug = data.get("slug");
//     const index = data.get("index");
//     const type = data.get("type");

//     if (!file) {
//       return new Response(JSON.stringify({ error: "No file received" }), {
//         status: 400,
//       });
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const uploadDir = path.join(process.cwd(), "public/uploads", slug);
//     await mkdir(uploadDir, { recursive: true });

//     const filePath = path.join(uploadDir, `image-${index}.${type}`);
//     await writeFile(filePath, buffer);

//     return new Response(
//       JSON.stringify({
//         url: `/uploads/${slug}/image-${index}.${type}`,
//       }),
//       { status: 200 }
//     );
//   } catch (error) {
//     console.error("UPLOAD ERROR:", error);
//     return new Response(JSON.stringify({ url: null }), { status: 500 });
//   }
// }





import { writeFile, mkdir, readdir } from "fs/promises";
import path from "path";

// Remove special chars + spaces
function sanitizeName(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-_]/g, "-") // keep only a-z 0-9 - _
    .replace(/-+/g, "-");
}

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");
    let slug = data.get("slug");
    let name = data.get("name");
    const index = data.get("index");
    const type = data.get("type")?.toLowerCase();

    if (!file) {
      return new Response(JSON.stringify({ error: "No file received" }), { status: 400 });
    }

    name = sanitizeName(name); // sanitize folder

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), "public/uploads", slug);
    await mkdir(uploadDir, { recursive: true });

    // Base filename
    let filename = `${name}.${type}`;
    let filePath = path.join(uploadDir, filename);

    // If exists → generate new name: image-0 (1).jpg
    const existingFiles = await readdir(uploadDir);
    let counter = 1;

    while (existingFiles.includes(filename)) {
      filename = `image-${index} (${counter}).${type}`;
      filePath = path.join(uploadDir, filename);
      counter++;
    }

    await writeFile(filePath, buffer);

    return new Response(
      JSON.stringify({
        url: `/uploads/${slug}/${filename}`,
      }),
      { status: 200 }
    );

  } catch (err) {
    console.error("UPLOAD ERROR:", err);
    return new Response(JSON.stringify({ url: null }), { status: 500 });
  }
}
