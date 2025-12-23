'use server';

import { S3Client, HeadObjectCommand } from '@aws-sdk/client-s3';
import { Upload } from '@aws-sdk/lib-storage';
import path from 'path';

function sanitizeName(str) {
  return str
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-_]/g, '-')
    .replace(/-+/g, '-');
}

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

const BUCKET = process.env.R2_BUCKET;
const PUBLIC_BASE_URL = process.env.R2_PUBLIC_URL_READ;

export async function uploadImageToR2(formData) {
  try {
    const file = formData.get('file');
    let slug = formData.get('slug') || 'default';
    let name = formData.get('name') || '';
    const index = formData.get('index');
    const type = (formData.get('type') || '').toLowerCase();

    if (!file || typeof file.arrayBuffer !== 'function') {
      throw new Error('No valid file received');
    }

    name = sanitizeName(`image-${index}`);
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const ext = type || path.extname(file.name).slice(1) || 'jpg';
    let filename = `${name}.${ext}`;
    let key = `uploads/${slug}/${filename}`;

    let counter = 1;
    let exists = true;
    while (exists && counter <= 20) {
      try {
        await s3Client.send(
          new HeadObjectCommand({ Bucket: BUCKET, Key: key }),
        );
        filename = `image-${index} (${counter}).${ext}`;
        key = `uploads/${slug}/${filename}`;
        counter++;
      } catch (err) {
        if (err.name === 'NotFound') {
          exists = false;
        } else {
          throw err;
        }
      }
    }

    if (exists) {
      throw new Error('Too many filename conflicts');
    }

    const upload = new Upload({
      client: s3Client,
      params: {
        Bucket: BUCKET,
        Key: key,
        Body: buffer,
        ContentType: file.type || 'application/octet-stream',
      },
    });

    await upload.done();

    const publicUrl = `${PUBLIC_BASE_URL}/${key}`;

    return { success: true, url: publicUrl };
  } catch (error) {
    console.error('R2 upload error:', error);
    return { success: false, error: error.message || 'Upload failed' };
  }
}
