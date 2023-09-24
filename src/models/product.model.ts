import {
    Entity,
    Column,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
    ManyToOne
} from 'typeorm';
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    Min
} from 'class-validator';
import { BaseModel } from "@models/_base.model";
import { SubCategory } from '@models/subcategory.model';

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

    @Column({ nullable: true })
    description: string;

    @ManyToOne(type => SubCategory, subCategory => subCategory.products)
    subCategory: SubCategory;
}
