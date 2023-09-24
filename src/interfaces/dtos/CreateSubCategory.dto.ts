import { IsNotEmpty, IsString, IsNumber } from "class-validator";

export class CreateSubCategory {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;
}