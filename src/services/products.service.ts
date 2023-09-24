import { InvalidSubCategory, ProductAlreadyExistsError } from '../exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '@models/product.model';
import { CreateProductDto } from '@interfaces/dtos/CreateProduct.dto';
import { SubCategory } from '@models/subcategory.model';
import { CRUDService } from '@services/crud.service';

@Injectable()
export class ProductsService extends CRUDService(Product) {
    constructor(
        @InjectRepository(SubCategory)
        private subCatergoriesRepository: Repository<SubCategory>,
    ) { super(); }

    public async create(createProductRequest: CreateProductDto): Promise<Product> {
        const subCategory = await this.subCatergoriesRepository.findOne({
            where: { id: createProductRequest.subCategoryId }
        });
        if (!subCategory) {
            throw new InvalidSubCategory();
        }
        try {
            const product = new Product()
            product.name = createProductRequest.name;
            product.description = createProductRequest.description;
            product.price = createProductRequest.price;
            product.subCategory = subCategory;
            await this.repository.save(product);
            return product;
        } catch (e) {
            throw new ProductAlreadyExistsError();
        }
    }

    public async update(id: string, createProductRequest: CreateProductDto): Promise<Product> {
        const subCategory = await this.subCatergoriesRepository.findOne({
            where: { id: createProductRequest.subCategoryId }
        });
        if (!subCategory) {
            throw new InvalidSubCategory();
        }
        const product = await this.getById(id);
        product.description = createProductRequest.description;
        product.price = createProductRequest.price;
        product.subCategory = subCategory;
        await this.repository.save(product);
        return product;
    }
}
