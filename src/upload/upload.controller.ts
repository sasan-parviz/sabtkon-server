import { Controller, Post, Body } from '@nestjs/common';
import { UploadService } from './upload.service';
import { CreatePresignedUploadUrl } from './dto/create-presigned-url.dto';
import { GetUser } from 'src/decorators/get-user.decorator';
import { User } from 'src/users/entities/user.entity';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth('JWT')
@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post()
  createPresignedUploadUrl(
    @GetUser() user: User,
    @Body() dto: CreatePresignedUploadUrl,
  ) {
    return this.uploadService.requestPresignedUploadUrl(user._id, dto.key);
  }
}
