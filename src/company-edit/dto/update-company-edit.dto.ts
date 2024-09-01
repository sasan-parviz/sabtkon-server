import { PartialType } from '@nestjs/swagger';
import { CreateCompanyEditDto } from './create-company-edit.dto';

export class UpdateCompanyEditDto extends PartialType(CreateCompanyEditDto) {}
