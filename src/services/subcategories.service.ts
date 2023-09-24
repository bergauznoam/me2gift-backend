import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import { SubCategory } from "@models/subcategory.model";

@Injectable()
export class SubCategoriesService {
    constructor(
        @InjectRepository(SubCategory)
        private subCategoriesRepository: Repository<SubCategory>,
    ) { }
}