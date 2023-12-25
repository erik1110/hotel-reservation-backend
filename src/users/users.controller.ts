import { Controller, Post, Body, HttpStatus, UsePipes, ValidationPipe } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser';
import { AppError } from 'src/utils/appError';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signup')
  @UsePipes(new ValidationPipe({ transform: true }))
  async signup(@Body() createUserDto: CreateUserDto) {
    try {
      const { name, email, password, phone, birthday, address } = createUserDto;

    //   const checkEmail = await this.usersService.findOneByEmail(email);
    //   if (checkEmail) {
    //     throw new HttpException('此 Email 已註冊', HttpStatus.BAD_REQUEST);
    //   }

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
    } catch (error) {
      if (error.code === 11000) {
        throw new AppError(HttpStatus.BAD_REQUEST, 'MongoServerError', 'Duplicated User');
      } else {
        throw error;
      }
    }
  }
}
