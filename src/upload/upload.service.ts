import { Injectable } from '@nestjs/common';
import { S3Client } from '@aws-sdk/client-s3';
import { createPresignedPost } from '@aws-sdk/s3-presigned-post';

@Injectable()
export class UploadService {
  async requestPresignedUploadUrl(userId: string, key: string) {
    const s3 = new S3Client({
      region: 'default',
      endpoint: 'https://storage.c2.liara.space',
      credentials: {
        accessKeyId: 'b5b3ohh25smolf03',
        secretAccessKey: '6f3a2429-4746-49f4-8916-a1ae4c8916af',
      },
    });

    const { url, fields } = await createPresignedPost(s3, {
      Bucket: 'sabtkon2',
      Key: key,
      Conditions: [
        { acl: 'public-read' },
        { bucket: 'sabtkon2' },
        ['starts-with', '$key', `user/${userId}`],
      ],
      Fields: {
        acl: 'public-read',
      },
      Expires: 600,
    });

    return {
      url,
      fields,
    };
  }
}
