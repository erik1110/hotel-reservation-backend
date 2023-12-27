import { IsNotEmpty, MinLength, MaxLength, IsEmail, IsString, Matches, IsDate, ValidateNested } from 'class-validator';
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


