import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
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
