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
    public getAllProducts(): Promise<ProductDto[]> {
        return this.productsService.get();
    }

    @Get(':id')
    public getProduct(@Param('id') id: string) {
        return this.productsService.getById(id);
    }

    @Post()
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public createProduct(@Body() createProductRequest: CreateProductDto): Promise<ProductDto> {
        return this.productsService.create(createProductRequest);
    }

    @Post(':id')
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public updateProduct(
        @Param('id') id: string,
        @Body() createProductRequest: CreateProductDto
    ): Promise<ProductDto> {
        return this.productsService.update(id, createProductRequest);
    }

    @Delete(':id')
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public deleteProduct(@Param('id') id: string): Promise<void> {
        return this.productsService.delete(id);
    }
}
