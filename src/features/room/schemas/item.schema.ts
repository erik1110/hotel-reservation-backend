import { Schema } from 'mongoose';
import { IItem } from '../interfaces/item.interface';

const itemSchema = new Schema<IItem>(
    {
        title: {
            type: String,
            required: [true, 'Item title 未填寫']
        },
        isProvide: {
            type: Boolean,
            required: [true, 'Item isProvide 未填寫']
        }
    },
    {
        _id: false
    }
);

export default itemSchema;
