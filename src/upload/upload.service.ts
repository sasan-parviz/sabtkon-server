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
      endpoint: 'http://62.60.198.24:9000', // 'http://localhost:9000',
      credentials: {
        accessKeyId: 'Ao5z2sfiG0qDcJzoCeLk', // '8Sg6D0TowFKrqlXhaViI',
        secretAccessKey: 'LKfrJBoI2d8SRvIUSeJFnjpfKWnMvzw4paQWcrQW', // 'KNEcwAdaVBUqKoblwMkqG7RFXdkUiJh7cC0YeF6u',
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
