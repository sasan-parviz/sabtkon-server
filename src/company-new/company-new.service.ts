import { Injectable } from '@nestjs/common';
import { CreateCompanyNewDto } from './dto/create-company-new.dto';
import { UpdateCompanyNewDto } from './dto/update-company-new.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CompanyNew } from './entities/company-new.entity';
import { Model } from 'mongoose';

@Injectable()
export class CompanyNewService {
  constructor(
    @InjectModel(CompanyNew.name) private companyNewModel: Model<CompanyNew>,
  ) {}

  async findAll() {
    return await this.companyNewModel.find({});
  }

  async findAllForMe(userId: string) {
    return await this.companyNewModel.find({ userId });
  }

  async findById(id: string) {
    return await this.companyNewModel.findById(id);
  }

  async create(dto: CreateCompanyNewDto) {
    const newCompanyEdit = new this.companyNewModel(dto);
    return await newCompanyEdit.save();
  }

  async update(id: string, dto: UpdateCompanyNewDto) {
    const companyEdit = await this.companyNewModel.findById(id);
    Object.assign(companyEdit, {
      ...dto,
    });
    return await companyEdit.save();
  }

  async remove(id: string) {
    return await this.companyNewModel.findByIdAndDelete(id);
  }
}
