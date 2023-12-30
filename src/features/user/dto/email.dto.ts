import {
  IsEmail,
  IsNotEmpty,
  IsString,
  IsUUID,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class EmailDto {
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
}

export class GenerateEmailSuccessDto {
  @ApiProperty({ example: true })
  status: boolean;

  @ApiProperty({ example: '信件已寄出' })
  message: string;
}
