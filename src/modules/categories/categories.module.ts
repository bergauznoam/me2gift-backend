import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { Category } from '../../models/category.model';
import { CategoriesService } from '../../services/categories.service';
import { CategoriesController } from './categories.controller';

@Module({
    imports: [TypeOrmModule.forFeature([Category])],
    providers: [CategoriesService],
    controllers: [CategoriesController],
})
export class CategoriesModule { }
