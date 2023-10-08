import { IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { Column, Entity, OneToMany } from "typeorm";
import { BaseModel } from "@models/_base.model";
import { Product } from "@models/product.model";
import { OrderDto } from "@DTOs/Order.dto";

export enum OrderState {
    PENDING = "pending",
    IN_PROGRESS = "in progress",
    DONE = "done",
}

@Entity({ name: "orders" })
export class Order extends BaseModel {
    @Column()
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @Column()
    @IsString()
    @IsNotEmpty()
    lastName: string;

    @Column()
    @IsPhoneNumber("IL")
    @IsNotEmpty()
    phone: string;

    @Column()
    @IsEmail()
    @IsNotEmpty()
    email: string;

    @Column({ default: "" })
    @IsString()
    comment: string;

    @OneToMany(type => Product, product => product)
    products: Product[];

    @Column({ default: OrderState.PENDING })
    @IsEnum(OrderState)
    state: OrderState;

    public format(): OrderDto {
        return {
            id: this.id,
            firstName: this.firstName,
            lastName: this.lastName,
            phone: this.phone,
            email: this.email,
            state: this.state,
            comment: this.comment,
            createdAt: this.createdAt,
            updatedAt: this.updatedAt,
            products: this.products.map(p => p.format())
        }
    }
} 
