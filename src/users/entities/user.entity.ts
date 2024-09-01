import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';
import { Sex } from '../enums/sex.enum';

export type UserDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  _id: string;
  createdAt: Date;
  updatedAt: Date;

  @Prop({ required: true })
  firstname: string;

  @Prop({ required: true })
  lastname: string;

  @Prop({ required: true })
  mobile: string;

  @Prop()
  birthdate: Date;

  @Prop({ required: false, default: '' })
  avatar: string;

  @Prop({ required: false, default: Sex.MALE })
  sex: Sex;

  @Prop({ required: false, default: false })
  isAdmin: boolean;
}

export const UserSchema = SchemaFactory.createForClass(User);
