import { Document } from 'mongoose';

export interface INews extends Document {
  title: string;
  description: string;
  image: string;
  creator: string;
}
