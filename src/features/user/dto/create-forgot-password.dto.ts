import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateForgotPasswordDto {
    @ApiProperty({
      example: 'test@gmail.com',
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
      example: '0Zvjde',
      description: 'Code',
      format: 'string',
      uniqueItems: true,
      minLength: 6,
      maxLength: 6,
    })
    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    @MaxLength(6)
    readonly code: string;

    @ApiProperty({
      example: '1234',
      description: 'Password',
      format: 'string',
      minLength: 4,
      maxLength: 1024,
    })
    @ApiProperty()
    @IsNotEmpty()
    @IsString()
    @MinLength(4)
    @MaxLength(1024)
    readonly newPassword: string;
  }

  export class CreateForgotPasswordSuccessDto {
    @ApiProperty({ example: true})
    status: boolean;
  
    @ApiProperty({ example: '修改密碼成功'})
    message: string;
  }