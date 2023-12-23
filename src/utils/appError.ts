import { HttpException } from '@nestjs/common';

export class AppError extends HttpException {
  public isOperational: boolean;

  constructor(statusCode: number, errName: string, errMessage: string) {
    super({ statusCode, errName, errMessage }, statusCode);
    this.name = errName;
    this.message = errMessage;
    this.isOperational = true;
  }
}
