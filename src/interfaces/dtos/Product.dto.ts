import { IsNotEmpty, IsNumber, IsString, IsUrl, Min } from "class-validator";
import { SubCategoryDto } from "./SubCategory.dto";
import { BaseModelDto } from "./base.dto";
import { ICRUDFilters } from "@interfaces/crud-service.interface";

export class ProductDto extends BaseModelDto {
    name: string;
    price: number;
    description: string;
    image_url: string;
    subCategory: SubCategoryDto;
}

export interface ProductFilters extends ICRUDFilters<ProductDto> {
    categoryId?: number;
    subCategoryId?: number;
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

    @IsNotEmpty()
    @IsUrl()
    image_url: string;
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

    @IsNotEmpty()
    @IsUrl()
    image_url: string;
}