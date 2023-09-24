import { Injectable } from "@nestjs/common";

import { SubCategory } from "@models/subcategory.model";
import { CRUDService } from "./crud.service";

@Injectable()
export class SubCategoriesService extends CRUDService(SubCategory) {
}