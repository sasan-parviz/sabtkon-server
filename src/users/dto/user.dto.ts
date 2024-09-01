import { ApiProperty, OmitType, PartialType, PickType } from '@nestjs/swagger';
import {
  IsString,
  Length,
  Matches,
  IsDateString,
  IsEnum,
  IsBoolean,
  IsOptional,
} from 'class-validator';
import { Sex } from '../enums/sex.enum';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @Length(3, 50)
  firstname: string;

  @ApiProperty()
  @IsString()
  @Length(3, 50)
  lastname: string;

  @ApiProperty()
  @IsString()
  @Matches(/^09[0-9]{9}$/)
  mobile: string;

  @ApiProperty()
  @IsDateString()
  @IsOptional()
  birthdate: Date;

  @ApiProperty()
  @IsString()
  @IsOptional()
  avatar: string;

  @ApiProperty()
  @IsEnum(Sex)
  @IsOptional()
  sex: Sex;

  @ApiProperty()
  @IsBoolean()
  @IsOptional()
  isAdmin: boolean;
}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

// Login DTO
export class LoginRequestOtpDto extends PickType(CreateUserDto, ['mobile']) {}
export class LoginSubmitOtpDto extends PickType(CreateUserDto, ['mobile']) {
  @ApiProperty()
  @IsString()
  otpCode: string;
}
export class LoginSubmitInformationDto extends OmitType(CreateUserDto, [
  'avatar',
  'isAdmin',
]) {
  @ApiProperty()
  @IsString()
  otpCode: string;
}
