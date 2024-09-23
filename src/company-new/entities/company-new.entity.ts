import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { CompanyNewStatus } from '../enums/company-new-status.enum';

export type CompanyNewDocument = HydratedDocument<CompanyNew>;

@Schema({ timestamps: true })
export class CompanyNew {
  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: string;

  @ApiProperty()
  @Prop({ type: {} })
  data: Record<string, any>;

  @ApiProperty({ enum: Object.keys(CompanyNewStatus) })
  @Prop({
    type: String,
    enum: Object.keys(CompanyNewStatus),
    default: CompanyNewStatus.CREATED,
    uppercase: true,
  })
  status: CompanyNewStatus;
}

export const CompanyNewSchema = SchemaFactory.createForClass(CompanyNew);

CompanyNewSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

CompanyNewSchema.set('toObject', { virtuals: true });
CompanyNewSchema.set('toJSON', { virtuals: true });

const autoPopulateFactory = (execPopulate: boolean) =>
  function (next) {
    const documents = this.populate('user');
    if (execPopulate) documents.execPopulate();
    next();
  };

CompanyNewSchema.pre('findOne', autoPopulateFactory(false)).pre(
  'find',
  autoPopulateFactory(false),
);
