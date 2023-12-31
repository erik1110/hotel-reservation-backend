import { Request } from 'express';
import { AuthService } from '../../auth/auth.service';
import { LoginUserDto } from './dto/login-user.dto';
import { Injectable, HttpStatus } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { addHours } from 'date-fns';
import * as bcrypt from 'bcrypt';
import { CreateForgotPasswordDto } from './dto/create-forgot-password.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { EmailDto } from './dto/email.dto';
import * as nodemailer from 'nodemailer';
import { getHttpResponse } from 'src/utils/successHandler';
import { AppError } from 'src/utils/appError';
import { UpdateUserDto } from './dto/update-user.dto';
import { IUser } from './interfaces/user.interface';

@Injectable()
export class UserService {
  HOURS_TO_VERIFY = 4;
  HOURS_TO_BLOCK = 6;
  LOGIN_ATTEMPTS_TO_BLOCK = 5;

  constructor(
    @InjectModel('User') private readonly userModel: Model<IUser>,
    private readonly authService: AuthService,
  ) {}

  // ┌─┐┬─┐┌─┐┌─┐┌┬┐┌─┐  ┬ ┬┌─┐┌─┐┬─┐
  // │  ├┬┘├┤ ├─┤ │ ├┤   │ │└─┐├┤ ├┬┘
  // └─┘┴└─└─┘┴ ┴ ┴ └─┘  └─┘└─┘└─┘┴└─
  async create(createUserDto: CreateUserDto): Promise<IUser> {
    await this.isEmailUnique(createUserDto.email);
    const user = new this.userModel(createUserDto);
    user.password = await bcrypt.hash(user.password, 12);
    await user.save();
    return this.buildRegistrationInfo(user);
  }

  // ┬  ┬┌─┐┬─┐┬┌─┐┬ ┬  ┌─┐┌┬┐┌─┐┬┬
  // └┐┌┘├┤ ├┬┘│├┤ └┬┘  ├┤ │││├─┤││
  //  └┘ └─┘┴└─┴└   ┴   └─┘┴ ┴┴ ┴┴┴─┘

  async generateEmail(req: Request, emailDto: EmailDto) {
    const email = emailDto.email;
    const isEmailExists = await this.isEmailExists(email);
    if (!isEmailExists) {
      return getHttpResponse.successResponse({
        message: '信件已寄出',
      });
    }
    const { code, token } = await this.authService.generateEmailToken();
    const user = await this.userModel.findOneAndUpdate(
      {
        email: emailDto.email,
      },
      {
        verificationToken: token,
      },
      {
        new: true,
      },
    );
    if (user) {
      const transporter = await this.getTransporter();

      await transporter.sendMail({
        from: process.env.EMAILER_USER,
        to: email,
        subject: 'Hotel 訂房網 - 驗證用戶信箱',
        html: `
                <h2>驗證用戶信箱</h2>
                <p> ${user.name}，您好: <br />
                感謝您使用 Hotel 訂房網！為了確保您的帳戶安全，請使用以下連結並完成驗證流程：<br />
                請使用 ${code} 做為 Node 帳戶密碼安全性驗證碼
                如果你並未點選忘記密碼，你可以略過這則訊息。<br />
                如果你有任何問題，請聯繫我們：<a href="mailto:${process.env.EMAILER_USER}">${process.env.EMAILER_USER}</a><br />
                </p>
                <p style=color:gray>本郵件請勿直接回覆。</p>
                `,
      });
    }
    return getHttpResponse.successResponse({
      message: '信件已寄出',
    });
  }

  // ┬  ┌─┐┌─┐┬┌┐┌
  // │  │ ││ ┬││││
  // ┴─┘└─┘└─┘┴┘└┘
  async login(req: Request, loginUserDto: LoginUserDto) {
    const user = await this.findUserByEmail(loginUserDto.email);
    this.isUserBlocked(user);
    await this.checkPassword(loginUserDto.password, user);
    await this.passwordsAreMatch(user);
    return getHttpResponse.successResponse({
      message: '登入成功',
      data: {
        name: user.name,
        email: user.email,
        accessToken: await this.authService.createAccessToken(user._id),
      },
    });
  }

  // ┌─┐┌─┐┬─┐┌─┐┌─┐┌┬┐  ┌─┐┌─┐┌─┐┌─┐┬ ┬┌─┐┬─┐┌┬┐
  // ├┤ │ │├┬┘│ ┬│ │ │   ├─┘├─┤└─┐└─┐││││ │├┬┘ ││
  // └  └─┘┴└─└─┘└─┘ ┴   ┴  ┴ ┴└─┘└─┘└┴┘└─┘┴└──┴┘
  async forgotPassword(
    req: Request,
    createForgotPasswordDto: CreateForgotPasswordDto,
  ) {
    const user = await this.findByEmail(createForgotPasswordDto.email);
    const verificationToken = user.verificationToken;
    if (verificationToken === '') {
      throw new AppError(HttpStatus.BAD_REQUEST, 'UserError', '尚未寄信');
    }
    const payload = await this.authService.verifyToken(verificationToken);
    if (payload['code'] === createForgotPasswordDto.code) {
      await this.userModel.findByIdAndUpdate(
        user._id,
        {
          password: await bcrypt.hash(createForgotPasswordDto.newPassword, 12),
          verificationToken: null,
        },
        {
          new: true,
        },
      );
    } else {
      throw new AppError(
        HttpStatus.BAD_REQUEST,
        'UserError',
        '錯誤的信箱或驗證碼',
      );
    }

    return getHttpResponse.successResponse({
      message: '修改密碼成功',
    });
  }

  // ┌─┐┬─┐┌┬┐┌─┐┌─┐┌┬┐┌─┐┌┬┐  ┌─┐┌─┐┬─┐┬  ┬┬┌─┐┌─┐
  // ├─┘├┬┘ │ ├┤ │   │ ├┤  ││  └─┐├┤ ├┬┘└┐┌┘││  ├┤
  // ┴  ┴└─ ┴ └─┘└─┘ ┴ └─┘─┴┘  └─┘└─┘┴└─ └┘ ┴└─┘└─┘
  findAll(): any {
    return { hello: 'world' };
  }

  async getProfile(req: Request) {
    return getHttpResponse.successResponse({
      message: '取得使用者資訊',
      data: req['user'],
    });
  }

  async updateProfile(req: Request, updateUserDto: UpdateUserDto) {
    const { name, phone, birthday, address, oldPassword, newPassword } =
      updateUserDto;
    const user = await this.findUserByEmail(req['user'].email);
    await this.checkPassword(oldPassword, user);
    const result = await this.userModel.findByIdAndUpdate(
      user._id,
      {
        password: await bcrypt.hash(newPassword, 12),
        name: name,
        phone: phone,
        birthday: birthday,
        address: address,
      },
      {
        new: true,
        runValidators: true,
      },
    );

    return getHttpResponse.successResponse({
      message: '更新使用者資訊',
    });
  }

  // ********************************************
  // ╔═╗╦═╗╦╦  ╦╔═╗╔╦╗╔═╗  ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
  // ╠═╝╠╦╝║╚╗╔╝╠═╣ ║ ║╣   ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
  // ╩  ╩╚═╩ ╚╝ ╩ ╩ ╩ ╚═╝  ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝
  // ********************************************

  private buildRegistrationInfo(user): any {
    const userRegistrationInfo = {
      name: user.name,
      email: user.email,
    };
    return getHttpResponse.successResponse({
      message: '建立帳號成功',
      data: userRegistrationInfo,
    });
  }

  private async isEmailUnique(email: string) {
    const user = await this.userModel.findOne({ email });
    if (user) {
      throw new AppError(HttpStatus.BAD_REQUEST, 'UserError', '該信箱被註冊');
    }
  }

  private async findByEmail(email: string): Promise<IUser> {
    const user = await this.userModel
      .findOne({ email })
      .select('+verificationToken');
    if (!user) {
      throw new AppError(
        HttpStatus.BAD_REQUEST,
        'UserError',
        '錯誤的信箱或驗證碼',
      );
    }
    return user;
  }

  private async isEmailExists(email: string): Promise<boolean> {
    let isEmailExists = false;
    const user = await this.userModel.findOne({ email });
    if (user) {
      isEmailExists = true;
    }
    return isEmailExists;
  }

  private async findUserByEmail(email: string): Promise<IUser> {
    const user = await this.userModel.findOne({ email }).select('+password');
    if (!user) {
      throw new AppError(
        HttpStatus.BAD_REQUEST,
        'UserError',
        '錯誤的信箱或密碼',
      );
    }
    return user;
  }

  private async checkPassword(attemptPass: string, user) {
    const match = await bcrypt.compare(attemptPass, user.password);
    if (!match) {
      await this.passwordsDoNotMatch(user);
      throw new AppError(
        HttpStatus.BAD_REQUEST,
        'UserError',
        '錯誤的信箱或密碼',
      );
    }
    return match;
  }

  private isUserBlocked(user) {
    if (user.blockExpires > Date.now()) {
      throw new AppError(
        HttpStatus.BAD_REQUEST,
        'UserError',
        '該帳號封鎖中，請稍後再試',
      );
    }
  }

  private async passwordsDoNotMatch(user) {
    user.loginAttempts += 1;
    await user.save();
    if (user.loginAttempts >= this.LOGIN_ATTEMPTS_TO_BLOCK) {
      await this.blockUser(user);
      throw new AppError(
        HttpStatus.BAD_REQUEST,
        'UserError',
        '錯誤嘗試多次，封鎖該帳號',
      );
    }
  }

  private async blockUser(user) {
    user.blockExpires = addHours(new Date(), this.HOURS_TO_BLOCK);
    await user.save();
  }

  private async passwordsAreMatch(user) {
    user.loginAttempts = 0;
    user.loginCount += 1;
    await user.save();
  }

  private async getTransporter() {
    const { EMAILER_USER, EMAILER_PASSWORD } = process.env;

    if (!EMAILER_USER || !EMAILER_PASSWORD) {
      throw new Error('Email 服務未啟用');
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAILER_USER,
        pass: process.env.EMAILER_PASSWORD,
      },
    });

    await transporter.verify();

    return transporter;
  }
}
