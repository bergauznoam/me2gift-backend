import { SubCategoryDto } from "./SubCategory.dto";
import { BaseModelDto } from "./base.dto";

export class ProductDto extends BaseModelDto {
    name: string;
    price: number;
    description: string;
    subCategory: SubCategoryDto;
}