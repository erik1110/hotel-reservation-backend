import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { INews } from '../interfaces/news.interface';

@Schema({ timestamps: true, versionKey: false })
export class News extends Document implements INews {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  image: string;

  @Prop({ required: true })
  creator: string;
}

export const NewsSchema = SchemaFactory.createForClass(News);
