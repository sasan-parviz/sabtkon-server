import { ApiProperty, OmitType } from '@nestjs/swagger';
import { IsEnum, IsObject, IsOptional, IsString } from 'class-validator';
import { CompanyEditStatus } from '../enums/company-edit-status.enum';

export class CreateCompanyEditDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsObject()
  data: Record<string, any>;

  @ApiProperty()
  @IsEnum(CompanyEditStatus)
  @IsOptional()
  status: CompanyEditStatus;
}

export class CreateCompanyEditByUserDto extends OmitType(CreateCompanyEditDto, [
  'userId',
]) {}
