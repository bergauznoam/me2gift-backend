import { IsString, IsNotEmpty, IsEmail, IsNumberString } from 'class-validator';
import { BaseModelDto } from "./base.dto";

export class UserDto extends BaseModelDto {
    email: string;
    isAdmin: boolean;
}

export class LoginDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    password: string;
}

export class ResetPasswordDto {
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsNumberString()
    code?: string;
} 