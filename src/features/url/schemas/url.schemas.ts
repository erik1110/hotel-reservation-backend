import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { IUrl } from '../interfaces/url.interface';

@Schema({ timestamps: true, versionKey: false })
export class Url extends Document implements IUrl {
  @Prop({ required: true })
  originalUrl: string;

  @Prop({ required: true })
  shortUrl: string;
}

export const UrlSchema = SchemaFactory.createForClass(Url);
