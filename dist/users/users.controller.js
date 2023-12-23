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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
const CreateUser_1 = require("./dto/CreateUser");
const appError_1 = require("../utils/appError");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async signup(createUserDto) {
        try {
            const { name, email, password, phone, birthday, address } = createUserDto;
            const user = await this.usersService.create({
                name,
                email,
                phone,
                birthday,
                address,
                password: await this.usersService.hashPassword(password),
            });
            const { password: _, ...result } = user.toObject();
            return {
                status: true,
                token: this.usersService.generateToken({ userId: result._id }),
                result,
            };
        }
        catch (error) {
            if (error.code === 11000) {
                throw new appError_1.AppError(common_1.HttpStatus.BAD_REQUEST, 'UserError', 'Duplicated User');
            }
            else {
                throw error;
            }
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Post)('signup'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CreateUser_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "signup", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map