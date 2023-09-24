import { CreateCategoryDto } from '../../interfaces/dtos/CreateCategory.dto';
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { Category } from "src/models/category.model";
import { InvalidCategoryId } from "src/exceptions";

@Injectable()
export class CategoriesService {

    constructor(
        @InjectRepository(Category)
        private categoriesRepository: Repository<Category>,
    ) { }

    public getAllCategories(): Promise<Category[]> {
        return this.categoriesRepository.find();
    }

    public async getCategoryById(id: string): Promise<Category> {
        const category = await this.categoriesRepository.findOne({ where: { id: +id } });
        if (!category) {
            throw new InvalidCategoryId();
        }
        return category;
    }

    public async createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = new Category();
        category.name = createCategoryDto.name;
        await this.categoriesRepository.save(category);
        return category;
    }

    public async updateCategory(id: string, createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = await this.getCategoryById(id);
        category.name = createCategoryDto.name;
        await this.categoriesRepository.save(category);
        return category;
    }

    public async deleteCategory(id: string): Promise<void> {
        const category = await this.getCategoryById(id);
        await this.categoriesRepository.delete(category);
    }
}