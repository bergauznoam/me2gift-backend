import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { CategoryDto, UpdateCategoryDto } from '@interfaces/dtos/Category.dto';
import { CategoriesService } from '@services/categories.service';
import { AdminPermission } from '@root/roles.decorator';
import { CreateCategoryDto } from '@DTOs/Category.dto';
import { appConfiguration } from '@config/app.conf';

@Controller("categories")
@ApiTags("Categories")
export class CategoriesController {

    constructor(
        private readonly categoriesService: CategoriesService
    ) { }

    @Get()
    public async getCategories(): Promise<CategoryDto[]> {
        const categories = await this.categoriesService.get();
        return categories.map(c => c.format());
    }

    @Get(':id')
    public async getCategoryById(@Param('id') id: string): Promise<CategoryDto> {
        const category = await this.categoriesService.getById(id);
        return category.format();
    }

    @Post()
    @ApiHeader({ name: appConfiguration.jwtAccessTokenHeaderName })
    @AdminPermission()
    public async createCategory(@Body() createRequest: CreateCategoryDto): Promise<CategoryDto> {
        const category = await this.categoriesService.create(createRequest);
        return category.format();
    }


    @Put(':id')
    @ApiHeader({ name: appConfiguration.jwtAccessTokenHeaderName })
    @AdminPermission()
    public async updateCategory(
        @Param('id') id: string,
        @Body() updateRequest: UpdateCategoryDto
    ): Promise<CategoryDto> {
        const category = await this.categoriesService.update(id, updateRequest);
        return category.format();
    }

    @Delete(':id')
    @ApiHeader({ name: appConfiguration.jwtAccessTokenHeaderName })
    @AdminPermission()
    public deleteCategory(@Param('id') id: string): Promise<void> {
        return this.categoriesService.delete(id);
    }
}
