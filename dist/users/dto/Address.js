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
exports.AddressDto = void 0;
const swagger_1 = require("@nestjs/swagger");
const class_validator_1 = require("class-validator");
const zipcodes_1 = require("../../utils/zipcodes");
class AddressDto {
}
exports.AddressDto = AddressDto;
__decorate([
    (0, swagger_1.ApiProperty)({
        example: 100,
        description: 'Zip Code',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Zip Code is Null' }),
    (0, class_validator_1.IsIn)(zipcodes_1.zipCodeList, { message: 'Invalid Zip Code' }),
    __metadata("design:type", Number)
], AddressDto.prototype, "zipcode", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '100臺北市中正區',
        description: 'Detail',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'Detail is Null' }),
    (0, class_validator_1.IsIn)(zipcodes_1.zipDetailList, { message: 'Invalid Address Detail' }),
    __metadata("design:type", String)
], AddressDto.prototype, "detail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '中正區',
        description: 'County',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'County is Null' }),
    (0, class_validator_1.IsIn)(zipcodes_1.zipCountyList, { message: 'Invalid County' }),
    __metadata("design:type", String)
], AddressDto.prototype, "county", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({
        example: '臺北市',
        description: 'City',
    }),
    (0, class_validator_1.IsNotEmpty)({ message: 'City is Null' }),
    (0, class_validator_1.IsIn)(zipcodes_1.zipCityList, { message: 'Invalid City' }),
    __metadata("design:type", String)
], AddressDto.prototype, "city", void 0);
//# sourceMappingURL=Address.js.map