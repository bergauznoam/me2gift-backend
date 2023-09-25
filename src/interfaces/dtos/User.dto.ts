import { IsString, IsNotEmpty } from 'class-validator';
import { BaseModelDto } from "./base.dto";

export class UserDto extends BaseModelDto {
    email: string;
    isAdmin: boolean;
}

export class LoginDto {
    @IsString()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}