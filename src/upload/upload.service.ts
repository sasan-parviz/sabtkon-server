import { Injectable, BadRequestException } from '@nestjs/common';
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { CreatePresignedUploadUrlDto } from './dto/create-presigned-url.dto';

@Injectable()
export class UploadService {
  async requestPresignedUploadUrl(
    userId: string,
    dto: CreatePresignedUploadUrlDto,
  ) {
    if (dto.size > 5120000) {
      throw new BadRequestException('حجم فایل نباید بیشتر از 5 مگابایت باشد');
    }

    const s3 = new S3Client({
      region: 'default',
      endpoint: 'http://localhost:9000', // 'http://s3.ir-thr-at1.arvanstorage.ir',
      credentials: {
        accessKeyId: '8Sg6D0TowFKrqlXhaViI', // '6e3e34a1-75f2-4dd7-8aba-b6cccaf10836',
        secretAccessKey: 'KNEcwAdaVBUqKoblwMkqG7RFXdkUiJh7cC0YeF6u', // '6046d61437c7546f6542d80255976e53609a411e907ace4f02ffa3382d2bc3af',
      },
      forcePathStyle: true,
    });

    const command = new PutObjectCommand({
      Bucket: 'sabtkon',
      Key: `${userId}/${Date.now()}-${dto.key}`,
      ACL: 'public-read',
      ContentType: 'binary/octet-stream',
    });

    const signedUrl = await getSignedUrl(s3, command, { expiresIn: 99999 });

    return {
      signedUrl,
    };
  }
}
