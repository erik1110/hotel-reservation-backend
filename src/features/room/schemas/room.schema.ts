import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IRoom } from '../interfaces/room.interface';
import { IItem } from '../interfaces/item.interface';

@Schema({ timestamps: true, versionKey: false })
export class Room extends Document implements IRoom {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: false })
  imageUrl: string;

  @Prop({ required: false })
  imageUrlList: string[];

  @Prop({ required: true })
  areaInfo: string;

  @Prop({ required: true })
  bedInfo: string;

  @Prop({ required: true })
  maxPeople: number;

  @Prop({ required: true })
  price: number;

  @Prop({ required: true })
  status: number;

  @Prop({ required: false })
  facilityInfo: IItem[];

  @Prop({ required: false })
  amenityInfo: IItem[];

  @Prop({ required: true })
  creator: string;
}

export const RoomSchema = SchemaFactory.createForClass(Room);
