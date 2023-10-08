import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '@models/product.model';
import { Order } from '@models/order.model';
import { OrdersService } from '@services/orders.service';
import { OrdersController } from './orders.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Product, Order])],
    providers: [OrdersService],
    controllers: [OrdersController],
})
export class OrdersModule { }
