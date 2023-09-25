import { IsNotEmpty, IsNumber, IsString, Min } from "class-validator";
import { SubCategoryDto } from "./SubCategory.dto";
import { BaseModelDto } from "./base.dto";

export class ProductDto extends BaseModelDto {
    name: string;
    price: number;
    description: string;
    subCategory: SubCategoryDto;
}

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    @Min(0)
    price: number;

    @IsNumber()
    @IsNotEmpty()
    subCategoryId: number;
}

export class UpdateProductDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    description: string;

    @IsNumber()
    @Min(0)
    price: number;
}