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
    public async getCategories(): Promise<CategoryDto[]> {
        const categories = await this.categoriesService.get();
        console.log(categories)
        return categories.map(c => c.format());
    }

    @Get(':id')
    public async getCategoryById(@Param('id') id: string): Promise<CategoryDto> {
        const category = await this.categoriesService.getById(id);
        return category.format();
    }

    @Post()
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public async createCategory(@Body() createCategoryRequest: CreateCategoryDto): Promise<CategoryDto> {
        const category = await this.categoriesService.create(createCategoryRequest);
        return category.format();
    }


    @Post(':id')
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public async updateCategory(
        @Param('id') id: string,
        @Body() createCategoryRequest: CreateCategoryDto
    ): Promise<CategoryDto> {
        const category = await this.categoriesService.update(id, createCategoryRequest);
        return category.format();
    }

    @Delete(':id')
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public deleteCategory(@Param('id') id: string): Promise<void> {
        return this.categoriesService.delete(id);
    }
}
