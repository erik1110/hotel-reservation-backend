import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from 'src/schemas/User.schema';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from './dto/CreateUser';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async findOneByEmail(email: string): Promise<User | null> {
    return this.userModel.findOne({ email }).exec();
  }

  async create(createUserDto: CreateUserDto): Promise<User> {
    return this.userModel.create(createUserDto);
  }

  async hashPassword(password: string): Promise<string> {
    return bcrypt.hash(password, 6);
  }

  generateToken(payload: { userId: string }): string {
    // Implement your token generation logic here
    // For example, you can use the jwt module
    // return jwt.sign(payload, secretKey);
    return 'your_generated_token';
  }
}
