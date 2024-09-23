import { PartialType } from '@nestjs/swagger';
import { CreateCompanyNewDto } from './create-company-new.dto';

export class UpdateCompanyNewDto extends PartialType(CreateCompanyNewDto) {}
