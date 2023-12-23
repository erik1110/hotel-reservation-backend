"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppError = void 0;
const common_1 = require("@nestjs/common");
class AppError extends common_1.HttpException {
    constructor(statusCode, errName, errMessage) {
        super({ statusCode, errName, errMessage }, statusCode);
        this.name = errName;
        this.message = errMessage;
        this.isOperational = true;
    }
}
exports.AppError = AppError;
//# sourceMappingURL=appError.js.map