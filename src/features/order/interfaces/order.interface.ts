import { Schema, Document } from 'mongoose';

export interface IOrder extends Document {
  roomId: Schema.Types.ObjectId;
  checkInDate: Date;
  checkOutDate: Date;
  peopleNum: number;
  orderUserId: Schema.Types.ObjectId;
  userInfo: {
    name: string;
    phone: string;
    email: string;
    address: {
      zipcode: number;
      county: string;
      city: string;
    };
  };
  // 可使用：1，已刪除：-1
  status: number;
}
