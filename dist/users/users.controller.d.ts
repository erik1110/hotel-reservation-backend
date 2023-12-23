import { UsersService } from './users.service';
import { CreateUserDto } from './dto/CreateUser';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
    signup(createUserDto: CreateUserDto): Promise<{
        status: boolean;
        token: string;
        result: any;
    }>;
}
