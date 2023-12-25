"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ErrorDTO = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
class ErrorDTO {
}
exports.ErrorDTO = ErrorDTO;
__decorate([
    (0, swagger_1.ApiProperty)({ default: 'Internal Server Error' }),
    __metadata("design:type", String)
], ErrorDTO.prototype, "message", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ enum: common_1.HttpStatus, default: common_1.HttpStatus.INTERNAL_SERVER_ERROR }),
    __metadata("design:type", Number)
], ErrorDTO.prototype, "status_code", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ default: new Date().toISOString() }),
    __metadata("design:type", Date)
], ErrorDTO.prototype, "date", void 0);
//# sourceMappingURL=error.dto.js.map