import { PutObjectCommand, S3 } from "@aws-sdk/client-s3";

export async function uploadToS3(
    file: File
): Promise<{ file_key: string; file_name: string }> {
  try {
    const s3 = new S3({
      region: "us-east-1",
      credentials: {
        accessKeyId: process.env.NEXT_PUBLIC_S3_ACCESS_KEY_ID!,
        secretAccessKey: process.env.NEXT_PUBLIC_S3_SECRET_ACCESS_KEY!,
      },
    });

    const file_key = "uploads/" + file.name.replace(/\s+/g, "-");

    // 将 File 对象转换为 Buffer
    const fileBuffer = await file.arrayBuffer().then(Buffer.from);

    const params = {
      Bucket: process.env.NEXT_PUBLIC_S3_BUCKET_NAME!,
      Key: file_key,
      Body: fileBuffer,  // 使用转换后的 Buffer
      ContentType: file.type, // 添加正确的 Content-Type
    };

    const command = new PutObjectCommand(params);
    const response = await s3.send(command);

    if (response.$metadata.httpStatusCode !== 200) {
      throw new Error('Upload failed');
    }

    return {
      file_key,
      file_name: file.name,
    };
  } catch (error) {
    console.error('S3 upload error:', error);
    throw error;
  }
}


export function getS3Url(file_key: string) {
  const url = `https://${process.env.NEXT_PUBLIC_S3_BUCKET_NAME}.s3.us-east-1.amazonaws.com/${file_key}`;
  return url;
}