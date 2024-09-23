import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

// DTOs
import {
  CreateTransactionDto,
  RequestEditCompanyTransactionDto,
} from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';

// Entities
import { Transaction } from './entities/transaction.entity';
import { CompanyEdit } from '../company-edit/entities/company-edit.entity';
import { TRANSACTION_STATUS } from './enums/transaction-status.enum';

@Injectable()
export class TransactionsService {
  constructor(
    @InjectModel(Transaction.name) private transactionModel: Model<Transaction>,
    @InjectModel(CompanyEdit.name) private companyEditModel: Model<CompanyEdit>,
  ) {}

  async findAll() {
    return await this.transactionModel.find({});
  }

  async findOne(id: string) {
    return await this.transactionModel.findById(id);
  }

  async findByUserId(userId: string) {
    return await this.transactionModel.find({ userId });
  }

  async findByCompanyEditId(companyEditId: string) {
    return await this.transactionModel.find({ companyEditId });
  }

  async requestEditCompanyTransaction(
    userId: string,
    { companyEditId }: RequestEditCompanyTransactionDto,
  ) {
    const companyEdit = await this.companyEditModel.findById(companyEditId);
    let amount = 0;
    Object.keys(companyEdit.data).forEach((i) => {
      if (companyEdit.data[i]?.enable) {
        amount += companyEdit.data[i]?.price;
      }
    });
    // TODO: need to add payment
    const transaction = new this.transactionModel({
      amount,
      companyEditId,
      status: TRANSACTION_STATUS.CREATED,
      userId,
      description: 'پرداخت تغییرات شرکت ' + companyEdit.data?.name,
    });
    await transaction.save();
  }

  async create(dto: CreateTransactionDto) {
    const transaction = new this.transactionModel(dto);
    return await transaction.save();
  }

  async update(id: string, dto: UpdateTransactionDto) {
    const transaction = await this.transactionModel.findById(id);
    Object.assign(transaction, {
      ...dto,
    });
    return await transaction.save();
  }

  async remove(id: string) {
    return await this.transactionModel.findByIdAndDelete(id);
  }
}
