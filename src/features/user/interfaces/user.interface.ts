import { Document } from 'mongoose';

export interface User extends Document {
    name: string;
    email: string;
    password: string;
    roles: [string];
    verification: string;
    loginAttempts?: number;
    blockExpires?: Date;
}
