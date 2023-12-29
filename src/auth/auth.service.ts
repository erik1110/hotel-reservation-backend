import { JwtPayload } from './interfaces/jwt-payload.interface';
import { Injectable, UnauthorizedException, NotFoundException, BadRequestException, HttpException, ForbiddenException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { sign, verify } from 'jsonwebtoken';
import { User } from 'src/features/user/interfaces/user.interface';
import { Request } from 'express';
import { getClientIp } from 'request-ip';
import * as Cryptr from 'cryptr';

@Injectable()
export class AuthService {

  cryptr: any;

  constructor(
    @InjectModel('User') private readonly userModel: Model<User>,
    private readonly jwtService: JwtService,
  ) {
    this.cryptr = new Cryptr(process.env.ENCRYPT_JWT_SECRET);
  }


  async generateEmailToken() {
    const code = this.generateRandomCode();
    const token = sign({code}, process.env.JWT_SECRET , { expiresIn: process.env.JWT_EXPIRATION });
    return { code, token };
  }

  async verifyToken(token: string) {
    try {
      return verify(token, process.env.JWT_SECRET) as JwtPayload;
    } catch (error) {
      if (error.name === "TokenExpiredError") {
        throw new BadRequestException('驗證碼已過期');
      }
      throw error
    }
  }

  async createAccessToken(userId: string) {
    const accessToken = sign({userId}, process.env.JWT_SECRET , { expiresIn: process.env.JWT_EXPIRATION });
    return this.encryptText(accessToken);
  }

  async validateUser(jwtPayload: JwtPayload): Promise<any> {
    const user = await this.userModel.findOne({_id: jwtPayload.userId});
    if (!user) {
      throw new UnauthorizedException('User not found.');
    }
    return user;
  }

  //   ┬┬ ┬┌┬┐  ┌─┐─┐ ┬┌┬┐┬─┐┌─┐┌─┐┌┬┐┌─┐┬─┐
  //   ││││ │   ├┤ ┌┴┬┘ │ ├┬┘├─┤│   │ │ │├┬┘
  //  └┘└┴┘ ┴   └─┘┴ └─ ┴ ┴└─┴ ┴└─┘ ┴ └─┘┴└─
  private jwtExtractor(request) {
    let token = null;
    if (request.header('x-token')) {
    token = request.get('x-token');
  } else if (request.headers.authorization) {
    token = request.headers.authorization.replace('Bearer ', '').replace(' ', '');
  } else if (request.body.token) {
    token = request.body.token.replace(' ', '');
  }
    if (request.query.token) {
    token = request.body.token.replace(' ', '');
  }
    const cryptr = new Cryptr(process.env.ENCRYPT_JWT_SECRET);
    if (token) {
      try {
        token = cryptr.decrypt(token);
      } catch (err) {
        throw new BadRequestException('Bad request.');
      }
  }
    return token;
}
  // ***********************
  // ╔╦╗╔═╗╔╦╗╦ ╦╔═╗╔╦╗╔═╗
  // ║║║║╣  ║ ╠═╣║ ║ ║║╚═╗
  // ╩ ╩╚═╝ ╩ ╩ ╩╚═╝═╩╝╚═╝
  // ***********************
  returnJwtExtractor() {
    return this.jwtExtractor;
  }

  getIp(req: Request): string {
    return getClientIp(req);
  }

  getBrowserInfo(req: Request): string {
    return req.header['user-agent'] || 'XX';
  }

  getCountry(req: Request): string {
    return req.header['cf-ipcountry'] ? req.header['cf-ipcountry'] : 'XX';
  }

  encryptText(text: string): string {
    return this.cryptr.encrypt(text);
  }

  generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

    let code = '';

    for (let i = 0; i < 6; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        code += characters.charAt(randomIndex);
    }

    return code;
};
}
