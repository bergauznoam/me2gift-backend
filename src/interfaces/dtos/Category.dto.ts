import { SubCategoryDto } from "./SubCategory.dto";
import { BaseModelDto } from "./base.dto";

export class CategoryDto extends BaseModelDto {
    name: string;
    subCategories: SubCategoryDto[];
}