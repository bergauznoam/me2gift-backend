import { InvalidSubCategory, ProductAlreadyExistsError } from '../exceptions';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Product } from '@models/product.model';
import { CreateProductDto, UpdateProductDto } from '@DTOs/Product.dto';
import { SubCategory } from '@models/subcategory.model';
import { CRUDService } from '@services/crud.service';

@Injectable()
export class ProductsService extends CRUDService(Product) {
    constructor(
        @InjectRepository(SubCategory)
        private subCatergoriesRepository: Repository<SubCategory>,
    ) {
        super();
        super.relations = ["subCategory", "subCategory.category"];
    }

    public async getByCategoryId(categoryId: number, subCategoryId?: number): Promise<Product[]> {
        let query = this.repository.createQueryBuilder("products")
            .leftJoinAndSelect("products.subCategory", "subCategory")
            .leftJoinAndSelect("subCategory.category", "category")
            .where('category.id = :categoryId', { categoryId })

        if (subCategoryId) {
            query = query.andWhere('subCategory.id = :subCategoryId', { subCategoryId });
        }

        return query.select(['products']).getMany();
    }

    public async create(createRequest: CreateProductDto): Promise<Product> {
        const subCategory = await this.subCatergoriesRepository.findOne({
            where: { id: createRequest.subCategoryId }
        });
        if (!subCategory) {
            throw new InvalidSubCategory();
        }
        try {
            const product = new Product()
            product.name = createRequest.name;
            product.description = createRequest.description;
            product.price = createRequest.price;
            product.subCategory = subCategory;
            product.imageUrl = createRequest.imageUrl;
            await this.repository.save(product);
            return product;
        } catch (e) {
            throw new ProductAlreadyExistsError();
        }
    }

    public async update(id: string, updateRequest: UpdateProductDto): Promise<Product> {
        const product = await this.getById(id);
        product.description = updateRequest.description;
        product.price = updateRequest.price;
        product.imageUrl = updateRequest.imageUrl;
        await this.repository.save(product);
        return product;
    }
}
