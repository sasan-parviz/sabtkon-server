import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { CompanyNewStatus } from '../enums/company-new-status.enum';

export class CreateCompanyNewDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsObject()
  data: Record<string, any>;

  @ApiProperty()
  @IsEnum(CompanyNewStatus)
  @IsOptional()
  status: CompanyNewStatus;
}

export class CreateCompanyNewByUserDto extends OmitType(CreateCompanyNewDto, [
  'userId',
]) {}
