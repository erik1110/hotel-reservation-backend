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
exports.UserSchema = exports.User = void 0;
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const mongoose_3 = require("@nestjs/mongoose");
let User = class User extends mongoose_2.Document {
};
exports.User = User;
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'name 未填寫'],
    }),
    __metadata("design:type", String)
], User.prototype, "name", void 0);
__decorate([
    (0, mongoose_1.Prop)({
        type: String,
        required: [true, 'email 未填寫'],
    }),
    __metadata("design:type", String)
], User.prototype, "email", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: [true, 'password 未填寫'], select: false }),
    __metadata("design:type", String)
], User.prototype, "password", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, required: [true, 'phone 未填寫'] }),
    __metadata("design:type", String)
], User.prototype, "phone", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: Date, required: [true, 'birthday 未填寫'] }),
    __metadata("design:type", Date)
], User.prototype, "birthday", void 0);
__decorate([
    (0, mongoose_1.Prop)((0, mongoose_3.raw)({
        zipcode: { type: Number, required: [true, 'zipcode 未填寫'] },
        detail: { type: String, required: [true, 'detail 未填寫'] },
        county: { type: String, required: [true, 'county 未填寫'] },
        city: { type: String, required: [true, 'city 未填寫'] },
    })),
    __metadata("design:type", Object)
], User.prototype, "address", void 0);
__decorate([
    (0, mongoose_1.Prop)({ type: String, default: '', select: false }),
    __metadata("design:type", String)
], User.prototype, "verificationToken", void 0);
exports.User = User = __decorate([
    (0, mongoose_1.Schema)({ timestamps: true, versionKey: false })
], User);
exports.UserSchema = mongoose_1.SchemaFactory.createForClass(User);
//# sourceMappingURL=User.schema.js.map