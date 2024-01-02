import {
  IsNotEmpty,
  MinLength,
  MaxLength,
  IsEmail,
  IsString,
  Matches,
  IsDate,
  ValidateNested,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { AddressDto } from './address';

export class CreateUserDto {
  // fullName
  @ApiProperty({
    example: 'john',
    description: 'Name',
    format: 'string',
    minLength: 2,
    maxLength: 255,
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(2)
  @MaxLength(255)
  readonly name: string;

  // Email
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

  // Password
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
  readonly password: string;

  @ApiProperty({
    example: '0912345678',
    description: 'Phone',
  })
  @IsNotEmpty()
  @Matches(/^09\d{8}$/, { message: 'Invalid Phone' })
  phone: string;

  @ApiProperty({
    example: '1991-01-01',
    description: 'Birthday',
  })
  @IsNotEmpty()
  @Transform(({ value }) => new Date(value))
  @IsDate({ message: 'Invalid Birthday' })
  birthday: Date;

  @ApiProperty({
    type: AddressDto,
    description: 'Address',
  })
  @ValidateNested({ each: true })
  @Type(() => AddressDto)
  address: AddressDto;
}

export class CreateSuccessDto {
  @ApiProperty({ example: true })
  status: boolean;

  @ApiProperty({ example: '建立帳號成功' })
  message: string;

  @ApiProperty({
    example: {
      name: 'John',
      email: 'test@example.com',
    },
  })
  data: object;
}

export class UserSuccessDto {
  @ApiProperty({ example: true })
  status: boolean;

  @ApiProperty({ example: '取得使用者資訊' })
  message: string;

  @ApiProperty({
    example: {
      address: {
        zipcode: 100,
        county: '中正區',
        city: '臺北市',
      },
      _id: '658b9367df4b59a38f24e143',
      name: 'John',
      email: 'test@example.com',
      phone: '0912345678',
      birthday: '1991-01-01T00:00:00.000Z',
      role: ['user'],
      loginAttempts: 0,
      loginCount: 27,
      blockExpires: '2023-12-26T09:01:59.607Z',
      createdAt: '2023-12-27T03:00:55.922Z',
      updatedAt: '2023-12-28T04:01:21.006Z',
    },
  })
  data: object;
}
