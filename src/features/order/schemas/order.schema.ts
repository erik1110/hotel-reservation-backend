import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose';
import { IOrder } from '../interfaces/order.interface';
import { Document, Schema as MongooseSchema } from 'mongoose';

@Schema({ timestamps: true, versionKey: false })
export class Order extends Document implements IOrder {
  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  roomId: MongooseSchema.Types.ObjectId;

  @Prop({ type: Date, required: true})
  checkInDate: Date;

  @Prop({ type: Date, required: true })
  checkOutDate: Date;

  @Prop({ type: Number, required: true })
  peopleNum: number;

  @Prop({ type: MongooseSchema.Types.ObjectId, required: true })
  orderUserId: MongooseSchema.Types.ObjectId;

  @Prop(
    raw({
      name: { type: String, required: [true, 'name 未填寫'] },
      phone: { type: String, required: [true, 'phone 未填寫'] },
      email: { type: String, required: [true, 'email 未填寫'] },
      address: {
        zipcode: { type: Number, required: [true, 'zipcode 未填寫'] },
        county: { type: String, required: [true, 'county 未填寫'] },
        city: { type: String, required: [true, 'city 未填寫'] },
      },
    }),
  )
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
  @Prop({ required: true })
  status: number;
}

export const OrderSchema = SchemaFactory.createForClass(Order);
