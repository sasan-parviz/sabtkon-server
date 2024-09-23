import { ApiProperty, PickType } from '@nestjs/swagger';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { TRANSACTION_STATUS } from '../enums/transaction-status.enum';

export class CreateTransactionDto {
  @ApiProperty()
  @IsString()
  userId: string;

  @ApiProperty()
  @IsString()
  companyEditId: string;

  // @ApiProperty()
  // @IsString()
  // companyNewId: string;

  @ApiProperty()
  @IsNumber()
  amount: number;

  @ApiProperty()
  @IsString()
  @IsOptional()
  description: string;

  @ApiProperty()
  @IsEnum(TRANSACTION_STATUS)
  @IsOptional()
  status: TRANSACTION_STATUS;

  @ApiProperty()
  @IsString()
  @IsOptional()
  authority: string;
}

export class RequestEditCompanyTransactionDto extends PickType(
  CreateTransactionDto,
  ['companyEditId'],
) {}
