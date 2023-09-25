import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

import { ProductsService } from '@services/products.service';
import { ProductDto } from '@interfaces/dtos/Product.dto';
import { CreateProductDto } from '@interfaces/dtos/CreateProduct.dto';
import { AdminPermission } from '@root/roles.decorator';

@Controller("products")
@ApiTags("Products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    public async getAllProducts(): Promise<ProductDto[]> {
        const products = await this.productsService.get();
        return products.map(p => p.format());
    }

    @Get(':id')
    public async getProduct(@Param('id') id: string) {
        const product = await this.productsService.getById(id);
        return product.format();
    }

    @Post()
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public async createProduct(@Body() createProductRequest: CreateProductDto): Promise<ProductDto> {
        const product = await this.productsService.create(createProductRequest);
        return product.format();
    }

    @Post(':id')
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public async updateProduct(
        @Param('id') id: string,
        @Body() createProductRequest: CreateProductDto
    ): Promise<ProductDto> {
        const product = await this.productsService.update(id, createProductRequest);
        return product.format();
    }

    @Delete(':id')
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public deleteProduct(@Param('id') id: string): Promise<void> {
        return this.productsService.delete(id);
    }
}
