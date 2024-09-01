import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ApiProperty } from '@nestjs/swagger';
import mongoose, { HydratedDocument } from 'mongoose';
import { CompanyEditStatus } from '../enums/company-edit-status.enum';

export type CompanyEditDocument = HydratedDocument<CompanyEdit>;

@Schema({ timestamps: true })
export class CompanyEdit {
  @ApiProperty()
  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  })
  userId: string;

  @ApiProperty()
  @Prop({ type: {} })
  data: Record<string, any>;

  @ApiProperty({ enum: Object.keys(CompanyEditStatus) })
  @Prop({
    type: String,
    enum: Object.keys(CompanyEditStatus),
    default: CompanyEditStatus.CREATED,
    uppercase: true,
  })
  status: CompanyEditStatus;
}

export const CompanyEditSchema = SchemaFactory.createForClass(CompanyEdit);

CompanyEditSchema.virtual('user', {
  ref: 'User',
  localField: 'userId',
  foreignField: '_id',
  justOne: true,
});

CompanyEditSchema.set('toObject', { virtuals: true });
CompanyEditSchema.set('toJSON', { virtuals: true });

const autoPopulateFactory = (execPopulate: boolean) =>
  function (next) {
    const documents = this.populate('user');
    if (execPopulate) documents.execPopulate();
    next();
  };

CompanyEditSchema.pre('findOne', autoPopulateFactory(false)).pre(
  'find',
  autoPopulateFactory(false),
);
