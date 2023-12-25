import { AddressDto } from './Address';
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    phone: string;
    birthday: Date;
    address: AddressDto;
}
