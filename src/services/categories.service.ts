import { CreateCategoryDto, UpdateCategoryDto } from '@DTOs/Category.dto';
import { Injectable } from "@nestjs/common";

import { CRUDService } from "@services/crud.service";
import { Category } from "@models/category.model";

@Injectable()
export class CategoriesService extends CRUDService(Category) {

    constructor() {
        super();
        super.relations = ["subCategories"]
    }

    public async create(createRequest: CreateCategoryDto): Promise<Category> {
        const category = new Category();
        category.name = createRequest.name;
        await this.repository.save(category);
        return category;
    }

    public async update(id: string, updateRequest: UpdateCategoryDto): Promise<Category> {
        const category = await this.getById(id);
        category.name = updateRequest.name;
        await this.repository.save(category);
        return category;
    }
}