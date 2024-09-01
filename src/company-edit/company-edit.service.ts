import { Injectable } from '@nestjs/common';
import { CreateCompanyEditDto } from './dto/create-company-edit.dto';
import { UpdateCompanyEditDto } from './dto/update-company-edit.dto';
import { InjectModel } from '@nestjs/mongoose';
import { CompanyEdit } from './entities/company-edit.entity';
import { Model } from 'mongoose';

@Injectable()
export class CompanyEditService {
  constructor(
    @InjectModel(CompanyEdit.name) private companyEditModel: Model<CompanyEdit>,
  ) {}

  async findAll() {
    return await this.companyEditModel.find({});
  }

  async findAllForMe(userId: string) {
    return await this.companyEditModel.find({ userId });
  }

  async findById(id: string) {
    return await this.companyEditModel.findById(id);
  }

  async create(dto: CreateCompanyEditDto) {
    const newCompanyEdit = new this.companyEditModel(dto);
    return await newCompanyEdit.save();
  }

  async update(id: string, dto: UpdateCompanyEditDto) {
    const companyEdit = await this.companyEditModel.findById(id);
    Object.assign(companyEdit, {
      ...dto,
    });
    return await companyEdit.save();
  }

  async remove(id: string) {
    return await this.companyEditModel.findByIdAndDelete(id);
  }
}
