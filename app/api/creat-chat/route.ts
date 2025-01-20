import { NextResponse } from 'next/server';
import { db } from '@/lib/db/quries'; // Import your database connection
import { chat } from '@/lib/db/schema'; // Import your schema
import { getS3Url } from '@/lib/s3'; // Import your S3 utility
import { auth } from "@clerk/nextjs/server";

export async function POST(req: Request) {
  const { userId } = await auth();
  if (!userId) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { file_key, file_name } = body;

    if (!file_key || !file_name) {
      return NextResponse.json({ error: 'file_key and file_name are required' }, { status: 400 });
    }

    console.log('file_key:', file_key, 'file_name:', file_name);

    const chat_id = await db
      .insert(chat)
      .values({
        fileKey: file_key,
        pdfName: file_name,
        pdfUrl: getS3Url(file_key),
        userId,
      })
      .returning({
        insertedId: chat.id,
      });
; // Adjust this if returning syntax differs

    console.log('Inserted chat ID:', chat_id);

    return NextResponse.json(
      {
        chat_id: chat_id[0].insertedId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error during POST /api/create-chat:', error);
    return NextResponse.json({ error: 'internal server error' }, { status: 500 });
  }
}
