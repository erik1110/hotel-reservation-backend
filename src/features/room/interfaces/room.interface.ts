import { Document } from 'mongoose';
import { IItem } from './item.interface';

export interface IRoom extends Document {
  name: string;
  description: string;
  imageUrl: string;
  imageUrlList: string[];
  areaInfo: string;
  bedInfo: string;
  maxPeople: number;
  price: number;
  // 可使用：1，已刪除：-1
  status: number;
  facilityInfo: IItem[];
  amenityInfo: IItem[];
  creator: string;
}

