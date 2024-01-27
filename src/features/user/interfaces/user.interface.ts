import { Document } from 'mongoose';

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  roles: [string];
  birthday: Date;
  address: {
    zipcode: number;
    county: string;
    city: string;
    detail: string;
  };
  verificationToken: string;
  loginAttempts?: number;
  blockExpires?: Date;
}
