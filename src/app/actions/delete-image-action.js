'use server'; 

import { S3Client, DeleteObjectCommand } from '@aws-sdk/client-s3';

const s3Client = new S3Client({
  region: 'auto',
  endpoint: `https://${process.env.R2_ACCOUNT_ID}.r2.cloudflarestorage.com`,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY,
  },
});

export async function deleteImageFromR2(imageUrl) {
  try {
    if (!imageUrl) {
      throw new Error('Image URL is required');
    }

    const urlObj = new URL(imageUrl);
    const key = urlObj.pathname.slice(1);

    const command = new DeleteObjectCommand({
      Bucket: process.env.R2_BUCKET,
      Key: key,
    });

    await s3Client.send(command);

    return { success: true, message: 'Image deleted from R2' };
  } catch (error) {
    console.error('Delete error:', error);
    return { success: false, error: error.message || 'Failed to delete image' };
  }
}