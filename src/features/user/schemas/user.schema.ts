import * as mongoose from 'mongoose';
import * as validator from 'validator';
import * as bcrypt from 'bcrypt';
import { isEmail, isUUID } from 'class-validator';

export const UserSchema = new mongoose.Schema ({
    fullName: {
        type: String,
        minlength: 6,
        maxlength: 255,
        required: [true, 'NAME_IS_BLANK'],
    },
    email: {
        type: String,
        lowercase: true,
        validate: isEmail,
        maxlength: 255,
        minlength: 6,
        required: [true, 'EMAIL_IS_BLANK'],
    },
    password: {
        type: String,
        minlength: 5,
        maxlength: 1024,
        required: [true, 'PASSWORD_IS_BLANK'],
    },
    bankAccountNumber: {
        type: String,
        maxlength: 32,
    },
    bankAccountOwnerName: {
        type: String,
        minlength: 6,
        maxlength: 255,
    },
    roles: {
        type: [String],
        default: ['user'],
    },
    verification: {
        type: String,
        validate: isUUID,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    verificationExpires: {
        type: Date,
        default: Date.now,
    },
    loginAttempts: {
        type: Number,
        default: 0,
    },
    blockExpires: {
      type: Date,
      default: Date.now,
    },
}, {
    versionKey: false,
    timestamps: true,
});
