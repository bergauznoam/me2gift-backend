import { Injectable } from "@nestjs/common";

import { SubCategory } from "@models/subcategory.model";
import { CRUDService } from "@services/crud.service";
import { CreateSubCategory, UpdateSubCategory } from "@DTOs/SubCategory.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Category } from "@models/category.model";
import { Repository } from "typeorm";

@Injectable()
export class SubCategoriesService extends CRUDService(SubCategory) {

    constructor(
        @InjectRepository(Category)
        private catergoriesRepository: Repository<Category>,
    ) {
        super();
        super.relations = ["category", "products"];
    }

    public async create(createRequest: CreateSubCategory): Promise<SubCategory> {
        const category = await this.catergoriesRepository.findOne({ where: { id: createRequest.categoryId } });
        if (!category) {
            throw new Error();
        }
        const subCategory = new SubCategory();
        subCategory.name = createRequest.name;
        subCategory.category = category;
        await this.repository.save(subCategory);
        return subCategory;
    }

    public async update(id: string, updateRequest: UpdateSubCategory): Promise<SubCategory> {
        const subCategory = await this.getById(id);
        subCategory.name = updateRequest.name;
        await this.repository.save(subCategory);
        return subCategory;
    }
}