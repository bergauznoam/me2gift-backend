import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';

import { ProductsService } from './products.service';
import { ProductDto } from 'src/interfaces/dtos/Product.dto';
import { CreateProductDto } from 'src/interfaces/dtos/CreateProduct.dto';
import { AdminPermission } from 'src/roles.decorator';

@Controller("products")
@ApiTags("Products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    public getAllProducts(): Promise<ProductDto[]> {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    public getProduct(@Param('id') id: string) {
        return this.productsService.getProductById(id);
    }

    @Post()
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public createProduct(@Body() createProductRequest: CreateProductDto): Promise<ProductDto> {
        return this.productsService.createProduct(createProductRequest);
    }

    @Post(':id')
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public updateProduct(
        @Param('id') id: string,
        @Body() createProductRequest: CreateProductDto
    ): Promise<ProductDto> {
        return this.productsService.updateProduct(id, createProductRequest);
    }

    @Delete(':id')
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public deleteProduct(@Param('id') id: string): Promise<boolean> {
        return this.productsService.deleteProduct(id);
    }
}
