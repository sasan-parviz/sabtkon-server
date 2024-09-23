import { Module } from '@nestjs/common';
import { CompanyNewService } from './company-new.service';
import { CompanyNewController } from './company-new.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { CompanyNew, CompanyNewSchema } from './entities/company-new.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: CompanyNew.name, schema: CompanyNewSchema },
    ]),
  ],
  controllers: [CompanyNewController],
  providers: [CompanyNewService],
})
export class CompanyNewModule {}
