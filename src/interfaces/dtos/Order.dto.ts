import { ArrayNotEmpty, IsArray, IsEmail, IsEnum, IsNotEmpty, IsPhoneNumber, IsString } from "class-validator";
import { ProductDto } from "./Product.dto";
import { BaseModelDto } from "./base.dto";
import { OrderState } from "@models/order.model";

export class OrderDto extends BaseModelDto {
    firstName: string;
    lastName: string;
    phone: string;
    email: string;
    comment: string;
    state: OrderState;
    products: ProductDto[];
}

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    firstName: string;

    @IsString()
    @IsNotEmpty()
    lastName: string;

    @IsPhoneNumber("IL")
    @IsNotEmpty()
    phone: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    comment: string;

    @ArrayNotEmpty()
    productIds: number[];
}

export class UpdateOrderStateDto {
    @IsNotEmpty()
    @IsEnum(OrderState)
    state: OrderState;
}