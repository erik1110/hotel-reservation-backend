import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, Matches, MaxLength, MinLength, ValidateNested } from 'class-validator';
import { AddressDto } from 'src/features/user/dto/address';

export class UserDto {

    @ApiProperty({
    type: AddressDto,
    description: 'Address',
    })
    @ValidateNested({ each: true })
    @Type(() => AddressDto)
    address: AddressDto;

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
        example: '0912345678',
        description: 'Phone',
      })
    @IsNotEmpty()
    @Matches(/^09\d{8}$/, { message: 'Invalid Phone' })
    phone: string;
}
