import { IsNotEmpty, IsString, IsNumber } from "class-validator";
import { CategoryDto } from "./Category.dto";
import { ProductDto } from "./Product.dto";
import { BaseModelDto } from "./base.dto";

export class SubCategoryDto extends BaseModelDto {
    name: string;
    category: CategoryDto;
    products: ProductDto[];
}

export class CreateSubCategory {

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    categoryId: number;
}

export class UpdateSubCategory {

    @IsString()
    @IsNotEmpty()
    name: string;
}