export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    phone: string;
    birthday: Date;
    address: {
        zipcode: number;
        detail: string;
        county: string;
        city: string;
    };
}
