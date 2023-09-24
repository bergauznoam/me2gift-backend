import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Product } from '../../models/product.model';
import { ProductsController } from './products.controller';
import { ProductsService } from '../../services/products.service';
import { SubCategory } from 'src/models/subcategory.model';

@Module({
    imports: [TypeOrmModule.forFeature([Product, SubCategory])],
    providers: [ProductsService],
    controllers: [ProductsController],
})
export class ProductsModule { }
