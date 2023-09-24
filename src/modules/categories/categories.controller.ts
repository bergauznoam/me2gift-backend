import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CategoryDto } from '@interfaces/dtos/Category.dto';
import { CategoriesService } from '@services/categories.service';
import { AdminPermission } from '@root/roles.decorator';
import { CreateCategoryDto } from '@interfaces/dtos/CreateCategory.dto';

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

    @Get(':id')
    public getCategoryById(@Param('id') id: string): Promise<CategoryDto> {
        return this.categoriesService.getCategoryById(id);
    }

    @Post()
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public createCategory(@Body() createCategoryRequest: CreateCategoryDto): Promise<CategoryDto> {
        return this.categoriesService.createCategory(createCategoryRequest);
    }


    @Post(':id')
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public updateCategory(
        @Param('id') id: string,
        @Body() createCategoryRequest: CreateCategoryDto
    ): Promise<CategoryDto> {
        return this.categoriesService.updateCategory(id, createCategoryRequest);
    }

    @Delete(':id')
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public deleteCategory(@Param('id') id: string): Promise<void> {
        return this.categoriesService.deleteCategory(id);
    }
}
