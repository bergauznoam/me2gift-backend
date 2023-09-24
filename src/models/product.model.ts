import {
    Entity,
    Column,
    PrimaryGeneratedColumn,
    CreateDateColumn,
    UpdateDateColumn,
    Unique,
    ManyToOne,
    JoinColumn,
} from 'typeorm';
import {
    IsNotEmpty,
    IsString,
    IsNumber,
    Min
} from 'class-validator';
import { SubCategory } from './subcategory.model';

@Entity({ name: "products" })
@Unique("name_subcategory_unique_constraint", ["name", "subCategory"])
export class Product {
    @PrimaryGeneratedColumn()
    id: number;

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

    @CreateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)" })
    public createdAt: Date;

    @UpdateDateColumn({ type: "timestamp", default: () => "CURRENT_TIMESTAMP(6)", onUpdate: "CURRENT_TIMESTAMP(6)" })
    public updatedAt: Date;

    @ManyToOne(type => SubCategory, subCategory => subCategory.products)
    subCategory: SubCategory;
}
