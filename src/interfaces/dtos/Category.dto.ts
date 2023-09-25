import { IsNotEmpty, IsString } from 'class-validator';
import { SubCategoryDto } from "./SubCategory.dto";
import { BaseModelDto } from "./base.dto";

export class CategoryDto extends BaseModelDto {
    name: string;
    subCategories: SubCategoryDto[];
}

export class CreateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}

export class UpdateCategoryDto {
    @IsString()
    @IsNotEmpty()
    name: string;
}