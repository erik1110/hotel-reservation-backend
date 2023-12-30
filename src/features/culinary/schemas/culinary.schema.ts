import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { ICulinary } from '../interfaces/culinary.interface';

@Schema({ timestamps: true, versionKey: false })
export class Culinary extends Document implements ICulinary {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  diningTime: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  creator: string;
}

export const CulinarySchema = SchemaFactory.createForClass(Culinary);
