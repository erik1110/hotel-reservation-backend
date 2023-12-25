"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorHandlerFilter = exports.resErrorProd = exports.resErrorDev = void 0;
const common_1 = require("@nestjs/common");
const resErrorDev = (err, res) => {
    res.status(err.statusCode).json({
        status: false,
        name: err.name,
        message: err.message,
        error: err,
        stack: err.stack,
    });
};
exports.resErrorDev = resErrorDev;
const resErrorProd = (err, res) => {
    const resErrorData = {
        status: false,
        name: '',
        message: '',
    };
    console.log("err:", err);
    if (err.isOperational) {
        resErrorData.message = err.message;
        resErrorData.name = err.name;
        res.status(err.statusCode).json(resErrorData);
    }
    else {
        console.error('出現重大錯誤', err);
        resErrorData.name = '出現重大錯誤';
        resErrorData.message = '系統錯誤，請洽系統管理員';
        res.status(err.statusCode).json(resErrorData);
    }
};
exports.resErrorProd = resErrorProd;
let ErrorHandlerFilter = class ErrorHandlerFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const err = exception;
        err.statusCode = err.status || common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        if (process.env.NODE_ENV === 'dev') {
            return (0, exports.resErrorDev)(err, response);
        }
        if (err.name === 'BadRequestException') {
            err.message = err.response.message;
            err.isOperational = true;
            return (0, exports.resErrorProd)(err, response);
        }
        (0, exports.resErrorProd)(err, response);
    }
};
exports.ErrorHandlerFilter = ErrorHandlerFilter;
exports.ErrorHandlerFilter = ErrorHandlerFilter = __decorate([
    (0, common_1.Catch)()
], ErrorHandlerFilter);
//# sourceMappingURL=errorHandler.js.map