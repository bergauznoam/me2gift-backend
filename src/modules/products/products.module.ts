import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '../../models/product.model';
import { ProductsController } from './products.controller';
import { ProducftsService } from './products.service';

@Module({
    imports: [TypeOrmModule.forFeature([Product])],
    providers: [ProducftsService],
    controllers: [ProductsController],
})
export class ProductsModule { }
