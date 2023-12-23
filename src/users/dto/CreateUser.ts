import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsNumber } from "class-validator";

export class CreateUserDto {
    @ApiProperty({
        example: 'john',
        description: 'Username',
    })
    @IsNotEmpty()
    name: string;

    @ApiProperty({
        example: 'test@exampl.com',
        description: 'Email',
    })
    @IsEmail()
    email: string;

    @ApiProperty({
        example: '1234',
        description: 'Password',
    })
    @IsNotEmpty()
    password: string;

    @ApiProperty({
        example: '0912345678',
        description: 'Phone',
    })
    @IsNotEmpty()
    phone: string;

    @ApiProperty({
        example: '1991/01/01',
        description: 'Birthday',
    })
    @IsNotEmpty()
    birthday: Date;

    @ApiProperty({
        example: {
            zipcode: 100,
            detail: '100臺北市中正區',
            county: '中正區',
            city: '臺北市',
        },
        description: 'Address',
    })
    @IsNotEmpty()
    address: {
      zipcode: number;
      detail: string;
      county: string;
      city: string;
    };
  }
