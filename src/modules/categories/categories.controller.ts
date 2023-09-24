import { Body, Controller, Get, Post } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from 'src/interfaces/dtos/Category.dto';
import { CategoriesService } from './categories.service';
import { AdminPermission } from 'src/roles.decorator';
import { CreateCategoryDto } from 'src/interfaces/dtos/CreateCategory.dto';

@Controller("categories")
@ApiTags("Categories")
export class CategoriesController {

    constructor(
        private readonly categoriesService: CategoriesService
    ) { }

    @Get()
    public getCategories(): Promise<CategoryDto[]> {
        return this.categoriesService.getAllCategories();
    }

    @Post()
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public createCategory(@Body() createCategoryRequest: CreateCategoryDto): Promise<CategoryDto> {
        return this.categoriesService.createCategory(createCategoryRequest);
    }
}
