import { IsNotEmpty, IsString } from "class-validator";
import { Column, Entity, OneToMany, Unique } from "typeorm";
import { SubCategory } from "@models/subcategory.model";
import { BaseModel } from "@models/_base.model";
import { CategoryDto } from "@DTOs/Category.dto";

@Entity({ name: "categories" })
@Unique("name_unique_constraint", ["name"])
export class Category extends BaseModel {
    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;

    @OneToMany(type => SubCategory, subCategory => subCategory.category)
    subCategories: SubCategory[];

    public format(): CategoryDto {
        return {
            id: this.id,
            name: this.name,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            subCategories: this.subCategories
        }
    }
} 
