import { HttpException } from '@nestjs/common';
export declare class AppError extends HttpException {
    isOperational: boolean;
    constructor(statusCode: number, errName: string, errMessage: string);
}
