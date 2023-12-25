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
exports.RegisterSuccess = void 0;
const swagger_1 = require("@nestjs/swagger");
class RegisterSuccess {
}
exports.RegisterSuccess = RegisterSuccess;
__decorate([
    (0, swagger_1.ApiProperty)({ example: true }),
    __metadata("design:type", Boolean)
], RegisterSuccess.prototype, "status", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: 'eyJhbGciOiJI' }),
    __metadata("design:type", String)
], RegisterSuccess.prototype, "token", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ example: {
            address: {
                zipcode: 802,
                detail: '文山路23號',
                county: '高雄市',
                city: '苓雅區',
            },
            _id: '6533f0ef4cdf5b7f762747b0',
            name: 'Lori Murphy',
            email: 'timmothy.ramos@example.com',
            phone: '(663) 742-3828',
            birthday: '1982-02-03T16:00:00.000Z',
            createdAt: '2023-10-21T15:40:31.526Z',
            updatedAt: '2023-10-21T15:40:31.526Z',
            id: '6533f0ef4cdf5b7f762747b0',
        }
    }),
    __metadata("design:type", Object)
], RegisterSuccess.prototype, "result", void 0);
//# sourceMappingURL=users.js.map