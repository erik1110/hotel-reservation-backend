import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { zipCodeList } from 'src/utils/zipcodes';
import { raw } from '@nestjs/mongoose';


export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  phone: string;
  birthday: Date;
  address: {
    zipcode: number;
    detail: string;
    county: string;
    city: string;
  };
  verificationToken: string;
}

@Schema({ timestamps: true, versionKey: false })
export class User extends Document implements IUser {
  @Prop({
    unique: true,
    type: String,
    required: [true, 'name 未填寫'],
  })
  name: string;

  @Prop({
    type: String,
    required: [true, 'email 未填寫'],
  })
  email: string;

  @Prop({ type: String, required: [true, 'password 未填寫'], select: false })
  password: string;

  @Prop({ type: String, required: [true, 'phone 未填寫'] })
  phone: string;

  @Prop({ type: Date, required: [true, 'birthday 未填寫'] })
  birthday: Date;

  @Prop(raw({
      zipcode: { type: Number, required: [true, 'zipcode 未填寫'] },
      detail: { type: String, required: [true, 'detail 未填寫'] },
      county: { type: String, required: [true, 'county 未填寫'] },
      city: { type: String, required: [true, 'city 未填寫'] },
  }))
  address: {
    zipcode: number;
    detail: string;
    county: string;
    city: string;
  };
  @Prop({ type: String, default: '', select: false })
  verificationToken: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
