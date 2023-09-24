import { IsNotEmpty, IsNumber, IsString } from "class-validator";
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { Category } from "@models/category.model";
import { Product } from "@models/product.model";

@Entity({ name: "subcategories" })
@Unique("name_category_unique_constraint", ["name", "category"])
export class SubCategory {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;

    @ManyToOne(type => Category, category => category.subCategories)
    category: Category;

    @OneToMany(type => Product, product => product.subCategory)
    products: Product[];
}
