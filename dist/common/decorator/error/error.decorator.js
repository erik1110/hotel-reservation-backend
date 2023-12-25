"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiErrorDecorator = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const error_dto_1 = require("../../dto/error.dto");
function ApiErrorDecorator(statusCode, name, message, options) {
    return (0, common_1.applyDecorators)((0, swagger_1.ApiResponse)({
        ...options,
        status: statusCode,
        description: name,
        schema: {
            default: {
                status: false,
                name: name,
                message: message,
            },
            type: (0, swagger_1.getSchemaPath)(error_dto_1.ErrorDTO),
        },
    }));
}
exports.ApiErrorDecorator = ApiErrorDecorator;
//# sourceMappingURL=error.decorator.js.map