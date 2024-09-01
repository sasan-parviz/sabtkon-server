import { Module } from '@nestjs/common';
import { CompanyEditService } from './company-edit.service';
import { CompanyEditController } from './company-edit.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyEdit, CompanyEditSchema } from './entities/company-edit.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyEdit.name, schema: CompanyEditSchema },
    ]),
  ],
  controllers: [CompanyEditController],
  providers: [CompanyEditService],
})
export class CompanyEditModule {}
