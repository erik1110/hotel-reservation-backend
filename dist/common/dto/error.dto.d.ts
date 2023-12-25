import { HttpStatus } from '@nestjs/common';
export declare class ErrorDTO {
    message: string;
    status_code: HttpStatus;
    date: Date;
}
