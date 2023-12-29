import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { raw } from '@nestjs/mongoose';
import { IUser } from '../interfaces/user.interface';

@Schema({ timestamps: true, versionKey: false })
export class User extends Document implements IUser {
  @Prop({ required: [true, 'name 未填寫'],})
  name: string;

  @Prop({ unique: true, required: [true, 'email 未填寫']})
  email: string;

  @Prop({ required: [true, 'password 未填寫'], select: false })
  password: string;

  @Prop({ required: [true, 'phone 未填寫'] })
  phone: string;

  @Prop({ required: [true, 'birthday 未填寫'] })
  birthday: Date;

  @Prop(raw({
      zipcode: { type: Number, required: [true, 'zipcode 未填寫'] },
      county: { type: String, required: [true, 'county 未填寫'] },
      city: { type: String, required: [true, 'city 未填寫'] },
  }))
  address: {
    zipcode: number;
    county: string;
    city: string;
  };
  @Prop({ type: String, default: '', select: false })
  verificationToken: string;

  @Prop({ default: ['user'] })
  roles: [string];

  @Prop({ default: 0 })
  loginAttempts: number;

  @Prop({ default: 0 })
  loginCount: number;

  @Prop({ default: Date.now() })
  blockExpires: Date;

}

export const UserSchema = SchemaFactory.createForClass(User);
