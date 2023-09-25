import { BaseModelDto } from "./base.dto";

export class UserDto extends BaseModelDto {
    email: string;
    isAdmin: boolean;
}