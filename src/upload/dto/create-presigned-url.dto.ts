import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreatePresignedUploadUrl {
  @ApiProperty()
  @IsString()
  key: string;
}
