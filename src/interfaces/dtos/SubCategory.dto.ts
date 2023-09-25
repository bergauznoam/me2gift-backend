import { CategoryDto } from "./Category.dto";
import { ProductDto } from "./Product.dto";
import { BaseModelDto } from "./base.dto";

export class SubCategoryDto extends BaseModelDto {
    name: string;
    category: CategoryDto;
    products: ProductDto[];
}