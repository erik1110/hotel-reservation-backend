
import { CreateForgotPasswordDto, CreateForgotPasswordSuccessDto } from './dto/create-forgot-password.dto';
import { Request } from 'express';
import { LoginSuccessDto, LoginUserDto } from './dto/login-user.dto';
import { Controller, Get, Post, Body, UseGuards, Req, HttpCode, HttpStatus, Put } from '@nestjs/common';
import { CreateSuccessDto, CreateUserDto, UserSuccessDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    } from '@nestjs/swagger';
import { EmailDto, GenerateEmailSuccessDto } from './dto/email.dto';
import { ApiErrorDecorator } from 'src/common/decorator/error/error.decorator';
import { UpdateUserDto, UpdateUserSuccessDto } from './dto/update-user.dto';

@ApiTags('User - 使用者')
@ApiErrorDecorator(HttpStatus.INTERNAL_SERVER_ERROR, 'CriticalError', '系統錯誤，請洽系統管理員')
@Controller('user')
export class UserController {
    constructor(
        private readonly userService: UserService,
        ) {}

    // ╔═╗╦ ╦╔╦╗╦ ╦╔═╗╔╗╔╔╦╗╦╔═╗╔═╗╔╦╗╔═╗
    // ╠═╣║ ║ ║ ╠═╣║╣ ║║║ ║ ║║  ╠═╣ ║ ║╣
    // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝╝╚╝ ╩ ╩╚═╝╩ ╩ ╩ ╚═╝

    @Post('login')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: '登入帳號 Login User',})
    @ApiOkResponse({type: LoginSuccessDto})
    async login(@Req() req: Request, @Body() loginUserDto: LoginUserDto) {
        return await this.userService.login(req, loginUserDto);
    }

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({summary: '註冊帳號 Register user',})
    @ApiCreatedResponse({type: CreateSuccessDto})
    @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'UserError', '該信箱已被註冊')
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    @Post('verify/generateEmailCode')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: '忘記密碼寄信 Forgot password and generate Email'})
    @ApiOkResponse({type: GenerateEmailSuccessDto})
    async verifyYouEmail(@Req() req: Request, @Body() emailDto: EmailDto) {
        return await this.userService.generateEmail(req, emailDto);
    }

    @Post('forgot')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: '忘記密碼 Forgot password'})
    @ApiOkResponse({ type: CreateForgotPasswordSuccessDto})
    @ApiErrorDecorator(HttpStatus.BAD_REQUEST, 'UserError', '錯誤的信箱或驗證碼')
    async forgotPassword(@Req() req: Request, @Body() createForgotPasswordDto: CreateForgotPasswordDto) {
        return await this.userService.forgotPassword(req, createForgotPasswordDto);
    }

    @Get('')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: '取得使用者資訊 Get user information'})
    @ApiOkResponse({ type: UserSuccessDto})
    @ApiErrorDecorator(HttpStatus.UNAUTHORIZED, 'UnauthorizedException', 'Unauthorized')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async getProfile(@Req() req: Request) {
        return await this.userService.getProfile(req);
    }

    @Get('check')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: '確認使用者是否登入 Get user information'})
    @ApiErrorDecorator(HttpStatus.UNAUTHORIZED, 'UnauthorizedException', 'Unauthorized')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async check() {
        return { status: true};
    }

    @Put('')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: '更新使用者資訊 Update user information'})
    @ApiOkResponse({ type: UpdateUserSuccessDto})
    @ApiErrorDecorator(HttpStatus.UNAUTHORIZED, 'UnauthorizedException', 'Unauthorized')
    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    async updateUser(@Req() req: Request, @Body() updateUserDto: UpdateUserDto) {
        return await this.userService.updateProfile(req, updateUserDto);
    }
}
