import { Controller, Get } from '@nestjs/common';
import { ProducftsService } from './products.service';
import { Product } from '../../models/product.model';

@Controller()
export class ProductsController {
    constructor(private readonly productsService: ProducftsService) { }
}
