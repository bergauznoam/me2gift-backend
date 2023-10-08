import {
    Entity,
    Column,
    Unique,
    ManyToOne,
} from 'typeorm';
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    Min,
    IsUrl
} from 'class-validator';
import { BaseModel } from "@models/_base.model";
import { SubCategory } from '@models/subcategory.model';
import { ProductDto } from '@DTOs/Product.dto';

@Entity({ name: "products" })
@Unique("name_subcategory_unique_constraint", ["name", "subCategory"])
export class Product extends BaseModel {
    @Column()
    @IsString()
    @IsNotEmpty()
    name: string;

    @Column()
    @IsNumber()
    @Min(0)
    price: number;

    @Column({ default: "" })
    @IsString()
    description: string;

    @Column()
    @IsUrl()
    imageUrl: string;

    @ManyToOne(type => SubCategory, subCategory => subCategory.products)
    subCategory: SubCategory;

    public format(): ProductDto {
        return {
            id: this.id,
            name: this.name,
            description: this.description,
            price: this.price,
            imageUrl: this.imageUrl,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            subCategory: this.subCategory?.format(),
        }
    }
}
