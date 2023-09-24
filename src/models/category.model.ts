import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, OneToMany, PrimaryGeneratedColumn, Unique } from "typeorm";
import { SubCategory } from "@models/subcategory.model";

@Entity({ name: "categories" })
@Unique("name_unique_constraint", ["name"])
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;

    @OneToMany(type => SubCategory, subCategory => subCategory.category)
    subCategories: SubCategory[];
}
