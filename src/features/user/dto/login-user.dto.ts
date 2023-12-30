import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginUserDto {
  @ApiProperty({
    example: 'test@example.com',
    description: 'Email',
    format: 'email',
    uniqueItems: true,
    minLength: 5,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(5)
  @MaxLength(255)
  @IsEmail()
  readonly email: string;

  @ApiProperty({
    example: '1234',
    description: 'Password',
    format: 'string',
    minLength: 4,
    maxLength: 1024,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(4)
  @MaxLength(1024)
  readonly password: string;
}
export class LoginSuccessDto {
  @ApiProperty({ example: true })
  status: boolean;

  @ApiProperty({ example: '登入成功' })
  message: string;

  @ApiProperty({
    example: {
      name: 'John',
      email: 'test@example.com',
      accessToken:
        '1b416370540475bda4772b7d99cc24bb822ea1406bc3d0bac0eb450324768c8839649ea029c91d674ebc89e0663068deb276192556eba2d865962560bcc8e6be87a7fcb14527c8035556019315922d9f6930af70ae9b13b798027016797642edd5acc658552c6e78126cac8066861d0d1e667a2a7e17b884a41365f0c532821da23d867b70a5eab9754e92ebd3860bb9071329ed57aebd3841c10e9d74248f95772b1ba10d2876630c6e43e72cc3dbcec8b0cf2935d1169b48062021453c3ba9',
    },
  })
  data: object;
}
