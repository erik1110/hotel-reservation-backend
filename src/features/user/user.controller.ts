
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { Request } from 'express';
import { LoginUserDto } from './dto/login-user.dto';
import { Controller, Get, Post, Body, UseGuards, Req, HttpCode, HttpStatus, BadRequestException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { AuthGuard } from '@nestjs/passport';
import {
    ApiCreatedResponse,
    ApiOkResponse,
    ApiTags,
    ApiBearerAuth,
    ApiOperation,
    } from '@nestjs/swagger';
import { Roles } from 'src/auth/decorators/roles.decorator';
import { EmailDto } from './dto/email.dto';

@ApiTags('User')
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
    @ApiOkResponse({})
    async login(@Req() req: Request, @Body() loginUserDto: LoginUserDto) {
        return await this.userService.login(req, loginUserDto);
    }

    @Post('/signup')
    @HttpCode(HttpStatus.CREATED)
    @ApiOperation({summary: '註冊帳號 Register user',})
    @ApiCreatedResponse({})
    async register(@Body() createUserDto: CreateUserDto) {
        return await this.userService.create(createUserDto);
    }

    // @Post('refresh-access-token')
    // @HttpCode(HttpStatus.CREATED)
    // @ApiOperation({summary: 'Refresh Access Token with refresh token',})
    // @ApiCreatedResponse({})
    // async refreshAccessToken(@Body() refreshAccessTokenDto: RefreshAccessTokenDto) {
    //     return await this.userService.refreshAccessToken(refreshAccessTokenDto);
    // }

    @Post('verify/generateEmailCode')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: '忘記密碼寄信 Forgot password and generate Email'})
    @ApiOkResponse({})
    async verifyYouEmail(@Req() req: Request, @Body() emailDto: EmailDto) {
        return await this.userService.generateEmail(req, emailDto);
    }

    @Post('forgot')
    @HttpCode(HttpStatus.OK)
    @ApiOperation({summary: '忘記密碼 Forgot password',})
    @ApiOkResponse({})
    async forgotPassword(@Req() req: Request, @Body() createForgotPasswordDto: CreateForgotPasswordDto) {
        return await this.userService.forgotPassword(req, createForgotPasswordDto);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({summary: '取得使用者資訊 Get user information'})
    @HttpCode(HttpStatus.OK)
    @Get('')
    async getProfile(@Req() req: Request) {
        return await this.userService.getProfile(req);
    }

    @UseGuards(AuthGuard('jwt'))
    @ApiBearerAuth()
    @ApiOperation({summary: '確認使用者是否登入 Get user information'})
    @HttpCode(HttpStatus.OK)
    @Get('check')
    async check() {
        return { status: true};
    }

    @Get('data')
    @UseGuards(AuthGuard('jwt'))
    @Roles('admin')
    @ApiBearerAuth()
    @ApiOperation({summary: 'A private route for check the auth',})
    @HttpCode(HttpStatus.OK)
    @ApiOkResponse({})
    findAll() {
        return this.userService.findAll();
    }

}
