import { ArgumentsHost, ExceptionFilter } from '@nestjs/common';
export declare const resErrorDev: (err: any, res: any) => void;
export declare const resErrorProd: (err: any, res: any) => void;
export declare class ErrorHandlerFilter implements ExceptionFilter {
    catch(exception: any, host: ArgumentsHost): void;
}
