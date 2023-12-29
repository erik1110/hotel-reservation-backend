import { Catch, ArgumentsHost, HttpStatus, ExceptionFilter } from '@nestjs/common';

const handledErrors = ['BadRequestException', 'UnauthorizedException', 'ForbiddenException'];

export const resErrorDev = (err: any, res: any) => {
  res.status(err.statusCode).json({
    status: false,
    name: err.name,
    message: err.message,
    error: err,
    stack: err.stack,
  });
};

export const resErrorProd = (err: any, res: any) => {
  const resErrorData = {
    status: false,
    name: '',
    message: '',
  };
  if (err.isOperational) {
    resErrorData.message = err.message;
    resErrorData.name = err.name;
    res.status(err.statusCode).json(resErrorData);
  } else {
    console.error('出現重大錯誤', err);
    resErrorData.name = 'CriticalError';
    resErrorData.message = '系統錯誤，請洽系統管理員';
    res.status(err.statusCode).json(resErrorData);
  }
};

@Catch()
export class ErrorHandlerFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const err = exception;
    err.statusCode = err.status || HttpStatus.INTERNAL_SERVER_ERROR;

    // dev
    if (process.env.NODE_ENV === 'dev') {
      
      return resErrorDev(err, response);
    }
    // production
    if (handledErrors.includes(err.name)) {
      err.message = err.response.message;
      err.isOperational = true;
      return resErrorProd(err, response);
    }
    resErrorProd(err, response);
  }
}
