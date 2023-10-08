import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";

import { CreateOrderDto } from '@DTOs/Order.dto';
import { CRUDService } from "@services/crud.service";
import { Order, OrderState } from '@models/order.model';
import { Product } from "@models/product.model";

@Injectable()
export class OrdersService extends CRUDService(Order) {

    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) {
        super();
        super.relations = ["products"]
    }

    public async create(createRequest: CreateOrderDto): Promise<Order> {
        const order = new Order();
        order.firstName = createRequest.firstName;
        order.lastName = createRequest.lastName;
        order.email = createRequest.email;
        order.phone = createRequest.phone;
        order.comment = createRequest.comment;
        order.products = await this.productsRepository.find({ where: { id: In(createRequest.productIds) } });
        await this.repository.save(order);
        return order;
    }

    public async getOrdersByEmail(email: string): Promise<Order[]> {
        return this.repository.find({ where: { email } });
    }

    public async updateOrderState(id: string, state: OrderState): Promise<Order> {
        const order = await this.getById(id);
        order.state = state;
        await this.repository.save(order);
        return order;
    }
}