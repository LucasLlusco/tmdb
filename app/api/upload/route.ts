import { NextRequest, NextResponse } from 'next/server';
import { createAdminClient } from '@/lib/appwrite/config.';
import { ID } from 'node-appwrite';

const {
  APPWRITE_USERS_AVATAR_BUCKET_ID: AVATAR_BUCKET_ID,
  NEXT_PUBLIC_APPWRITE_PROJECT_ID: PROJECT_ID
} = process.env

export async function POST(req: NextRequest) {
  const { storage } = await createAdminClient();

  const formData = await req.formData();
  const file = formData.get('file') as File;
  
  if (!file) {
    return NextResponse.json({ error: 'File not provided' }, { status: 400 });
  }

  try {
    const uploadedAvatar = await storage.createFile(AVATAR_BUCKET_ID!, ID.unique(), file);
    const avatarPath = '/storage/buckets/{bucketId}/files/{fileId}/view?project={projectId}'
    .replace('{bucketId}', AVATAR_BUCKET_ID!)
    .replace('{fileId}', uploadedAvatar.$id)
    .replace('{projectId}', PROJECT_ID!);

    return NextResponse.json({ success: true, avatarId: uploadedAvatar.$id, avatarPath: avatarPath});
  } catch (err) {
    return NextResponse.json({ error: 'Upload failed' }, { status: 500 });
  }
}