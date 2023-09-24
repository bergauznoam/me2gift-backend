import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubCategory } from '@models/subcategory.model';
import { SubCategoriesService } from '@services/subcategories.service';
import { SubCategoriesController } from '@subcategories/subcategories.controller';
import { Category } from '@models/category.model';

@Module({
    imports: [TypeOrmModule.forFeature([SubCategory, Category])],
    providers: [SubCategoriesService],
    controllers: [SubCategoriesController],
})
export class SubCategoriesModule { }
