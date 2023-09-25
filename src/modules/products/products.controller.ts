import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ApiHeader, ApiQuery, ApiTags } from '@nestjs/swagger';

import { ProductsService } from '@services/products.service';
import { ProductDto, UpdateProductDto } from '@DTOs/Product.dto';
import { CreateProductDto } from '@DTOs/Product.dto';
import { AdminPermission } from '@root/roles.decorator';
import { appConfiguration } from '@config/app.conf';

@Controller("products")
@ApiTags("Products")
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    @ApiQuery({ name: 'categoryId', required: false, type: Number })
    @ApiQuery({ name: 'subCategoryId', required: false, type: Number })
    public async getProducts(
        @Query('categoryId') categoryId?: number,
        @Query('subCategoryId') subCategoryId?: number,
    ): Promise<ProductDto[]> {
        let products = []
        if (!categoryId) {
            products = await this.productsService.get();
        } else {
            products = await this.productsService.getByCategoryId(categoryId, subCategoryId)
        }
        return products.map(p => p.format());
    }

    @Get(':id')
    public async getProductById(@Param('id') id: string): Promise<ProductDto> {
        const product = await this.productsService.getById(id);
        return product.format();
    }

    @Post()
    @ApiHeader({ name: appConfiguration.jwtAccessTokenHeaderName })
    @AdminPermission()
    public async createProduct(@Body() createRequest: CreateProductDto): Promise<ProductDto> {
        const product = await this.productsService.create(createRequest);
        return product.format();
    }

    @Put(':id')
    @ApiHeader({ name: appConfiguration.jwtAccessTokenHeaderName })
    @AdminPermission()
    public async updateProduct(
        @Param('id') id: string,
        @Body() updateRequest: UpdateProductDto
    ): Promise<ProductDto> {
        const product = await this.productsService.update(id, updateRequest);
        return product.format();
    }

    @Delete(':id')
    @ApiHeader({ name: appConfiguration.jwtAccessTokenHeaderName })
    @AdminPermission()
    public deleteProduct(@Param('id') id: string): Promise<void> {
        return this.productsService.delete(id);
    }
}
