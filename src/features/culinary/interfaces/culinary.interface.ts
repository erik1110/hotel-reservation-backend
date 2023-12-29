import { Document } from 'mongoose';

export interface ICulinary extends Document {
    title: string;
    description: string;
    diningTime: string;
    image: string;
    creator: string;
}
