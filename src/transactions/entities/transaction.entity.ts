import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { TRANSACTION_STATUS } from '../enums/transaction-status.enum';

export type TransactionDocument = HydratedDocument<Transaction>;

@Schema({ timestamps: true })
export class Transaction {
  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: string;

  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'CompanyEdit',
  })
  companyEditId: string;

  // @ApiProperty()
  // @Prop({
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'CompanyNew',
  // })
  // companyNewId: string;

  @ApiProperty()
  @Prop({ required: true })
  amount: number;

  @ApiProperty()
  @Prop({ required: true, trim: true, maxlength: 255, default: '' })
  description: string;

  @ApiProperty({ enum: Object.keys(TRANSACTION_STATUS) })
  @Prop({
    required: true,
    type: String,
    enum: Object.keys(TRANSACTION_STATUS),
    default: TRANSACTION_STATUS.CREATED,
    uppercase: true,
  })
  status: TRANSACTION_STATUS;

  @ApiProperty()
  @Prop({ required: false, type: String, default: undefined })
  authority: string;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);

TransactionSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

TransactionSchema.virtual('companyEdit', {
  ref: 'CompanyEdit',
  localField: 'companyEditId',
  foreignField: '_id',
  justOne: true,
});

// TransactionSchema.virtual('companyNew', {
//   ref: 'CompanyNew',
//   localField: 'companyNewId',
//   foreignField: '_id',
//   justOne: true,
// });

TransactionSchema.set('toObject', { virtuals: true });
TransactionSchema.set('toJSON', { virtuals: true });

const autoPopulateFactory = (execPopulate: boolean) =>
  function (next) {
    const documents = this.populate('user').populate('companyEdit');
    if (execPopulate) documents.execPopulate();
    next();
  };

TransactionSchema.pre('findOne', autoPopulateFactory(false)).pre(
  'find',
  autoPopulateFactory(false),
);
