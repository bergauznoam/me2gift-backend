import { IsNotEmpty, IsString } from "class-validator";
import {
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    Unique
} from "typeorm";
import { BaseModel } from "@models/_base.model";
import { Category } from "@models/category.model";
import { Product } from "@models/product.model";
import { SubCategoryDto } from "@DTOs/SubCategory.dto";

@Entity({ name: "subcategories" })
@Unique("name_category_unique_constraint", ["name", "category"])
export class SubCategory extends BaseModel {
    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ManyToOne(type => Category, category => category.subCategories)
    category: Category;

    @OneToMany(type => Product, product => product.subCategory)
    products: Product[];

    public format(): SubCategoryDto {
        return {
            id: this.id,
            name: this.name,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            products: this.products?.map(p => p.format()),
            category: this.category
        }
    }
}
