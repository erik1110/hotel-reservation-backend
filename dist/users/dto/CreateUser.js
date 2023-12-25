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
exports.CreateUserDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const Address_1 = require("./Address");
const class_transformer_1 = require("class-transformer");
class CreateUserDto {
}
exports.CreateUserDto = CreateUserDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'john',
        description: 'Username',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(2, 255, { message: 'Username length should be in 4~30 characters.' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "name", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 'test@exampl.com',
        description: 'Email',
    }),
    (0, class_validator_1.IsEmail)(),
    __metadata("design:type", String)
], CreateUserDto.prototype, "email", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1234',
        description: 'Password',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Length)(4, 30, { message: 'Password length should be in 4~30 characters' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "password", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '0912345678',
        description: 'Phone',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.Matches)(/^09\d{8}$/, { message: 'Invalid Phone' }),
    __metadata("design:type", String)
], CreateUserDto.prototype, "phone", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '1991-01-01',
        description: 'Birthday',
    }),
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_transformer_1.Transform)(({ value }) => new Date(value)),
    (0, class_validator_1.IsDate)({ message: 'Invalid Birthday' }),
    __metadata("design:type", Date)
], CreateUserDto.prototype, "birthday", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        type: Address_1.AddressDto,
        description: 'Address',
    }),
    (0, class_validator_1.ValidateNested)({ each: true }),
    (0, class_transformer_1.Type)(() => Address_1.AddressDto),
    __metadata("design:type", Address_1.AddressDto)
], CreateUserDto.prototype, "address", void 0);
//# sourceMappingURL=CreateUser.js.map