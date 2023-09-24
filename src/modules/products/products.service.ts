import { ProductAlreadyExistsError } from './../../exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from 'src/models/product.model';
import { InvalidProductId } from 'src/exceptions';
import { CreateProductDto } from 'src/interfaces/dtos/CreateProduct.dto';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private productsRepository: Repository<Product>,
    ) { }

    public getAllProducts(): Promise<Product[]> {
        return this.productsRepository.find();
    }

    public async getProductById(id: string): Promise<Product> {
        const product = await this.productsRepository.findOne({ where: { id: +id } });
        if (!product) {
            throw new InvalidProductId();
        }
        return product;
    }

    public async createProduct(createProductRequest: CreateProductDto): Promise<Product> {
        try {
            const product = new Product()
            product.name = createProductRequest.name;
            product.description = createProductRequest.description;
            product.price = createProductRequest.price;
            await this.productsRepository.save(product);
            return product;
        } catch (e) {
            throw new ProductAlreadyExistsError();
        }
    }

    public async updateProduct(id: string, createProductRequest: CreateProductDto): Promise<Product> {
        const product = await this.getProductById(id);
        product.description = createProductRequest.description;
        product.price = createProductRequest.price;
        await this.productsRepository.save(product);
        return product;
    }

    public async deleteProduct(id: string): Promise<boolean> {
        const product = await this.getProductById(id);
        if (!product) {
            throw new InvalidProductId();
        }
        this.productsRepository.delete(product);
        return true;
    }
}
