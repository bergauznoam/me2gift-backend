import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { SubCategory } from 'src/models/subcategory.model';
import { SubCategoriesService } from '../../services/subcategories.service';
import { SubCategoriesController } from './subcategories.controller';

@Module({
    imports: [TypeOrmModule.forFeature([SubCategory])],
    providers: [SubCategoriesService],
    controllers: [SubCategoriesController],
})
export class SubCategoriesModule { }
