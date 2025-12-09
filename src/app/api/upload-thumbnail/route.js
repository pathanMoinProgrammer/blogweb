import { writeFile, mkdir } from "fs/promises";
import path from "path";

export async function POST(req) {
  try {
    const data = await req.formData();
    const file = data.get("file");
    const slug = data.get("slug");

    if (!file || !slug) {
      return new Response(JSON.stringify({ error: "Missing file or slug" }), {
        status: 400,
      });
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = file.name.split(".").pop();
    const uploadDir = path.join(process.cwd(), "public/thumbnail");

    await mkdir(uploadDir, { recursive: true });

    const filePath = path.join(uploadDir, `${slug}.${ext}`);
    await writeFile(filePath, buffer);

    return new Response(
      JSON.stringify({
        url: `/thumbnail/${slug}.${ext}`,
      }),
      { status: 200 }
    );
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
