import { writeFile, mkdir, readdir } from 'fs/promises';
import path from 'path';

function sanitizeName(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-');
}

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get('file');
    let slug = data.get('slug');
    let name = data.get('name');
    const index = data.get('index');
    const type = data.get('type')?.toLowerCase();

    if (!file) {
      return new Response(JSON.stringify({ error: 'No file received' }), {
        status: 400,
      });
    }

    name = sanitizeName(name);

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const uploadDir = path.join(process.cwd(), 'public/uploads', slug);
    await mkdir(uploadDir, { recursive: true });

    let filename = `${name}.${type}`;
    let filePath = path.join(uploadDir, filename);

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
      { status: 200 },
    );
  } catch (err) {
    console.error('UPLOAD ERROR:', err);
    return new Response(JSON.stringify({ url: null }), { status: 500 });
  }
}
