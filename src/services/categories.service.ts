import { CreateCategoryDto } from '../interfaces/dtos/CreateCategory.dto';
import { Injectable } from "@nestjs/common";

import { CRUDService } from "@services/crud.service";
import { Category } from "@models/category.model";

@Injectable()
export class CategoriesService extends CRUDService(Category) {

    constructor() {
        super();
        super.relations = ["subCategories"]
    }

    public async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = new Category();
        category.name = createCategoryDto.name;
        await this.repository.save(category);
        return category;
    }

    public async update(id: string, createCategoryDto: CreateCategoryDto): Promise<Category> {
        const category = await this.getById(id);
        category.name = createCategoryDto.name;
        await this.repository.save(category);
        return category;
    }
}