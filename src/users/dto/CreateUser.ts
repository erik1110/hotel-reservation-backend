import { ApiProperty } from '@nestjs/swagger';
import { IsDate, IsEmail, IsNotEmpty, Length, Matches, ValidateNested } from "class-validator";
import { AddressDto } from './Address';
import { Transform, Type } from 'class-transformer';

export class CreateUserDto {
    @ApiProperty({
        example: 'john',
        description: 'Username',
    })
    @IsNotEmpty()
    @Length(2, 255, { message: 'Username length should be in 4~30 characters.' })
    name: string;

    @ApiProperty({
        example: 'test@example.com',
        description: 'Email',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '1234',
        description: 'Password',
    })
    @IsNotEmpty()
    @Length(4, 30, { message: 'Password length should be in 4~30 characters' })
    password: string;

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
