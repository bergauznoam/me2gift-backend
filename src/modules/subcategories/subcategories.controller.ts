import { SubCategoriesService } from '@services/subcategories.service';
import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ApiHeader, ApiTags } from '@nestjs/swagger';
import { SubCategoryDto } from '@DTOs/SubCategory.dto';
import { CreateSubCategory } from '@DTOs/SubCategory.dto';
import { AdminPermission } from '@root/roles.decorator';

@Controller("subcategories")
@ApiTags("SubCategories")
export class SubCategoriesController {
    constructor(
        private readonly subCategoriesService: SubCategoriesService
    ) { }

    @Get()
    public async getSubcategories(): Promise<SubCategoryDto[]> {
        const subCategories = await this.subCategoriesService.get();
        return subCategories.map(sub => sub.format());
    }

    @Get(':id')
    public async getSubcategoryById(
        @Param('id') id: string
    ): Promise<SubCategoryDto> {
        return this.subCategoriesService.getById(id);
    }

    @Post()
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public async createSubCategory(
        @Body() createSubCategoryRequest: CreateSubCategory
    ): Promise<SubCategoryDto> {
        const subCategory = await this.subCategoriesService.create(createSubCategoryRequest);
        return subCategory.format()
    }

    @Put(':id')
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public async updateSubcategory(
        @Param('id') id: string,
        @Body() createSubCategoryRequest: CreateSubCategory
    ): Promise<SubCategoryDto> {
        const subCategory = await this.subCategoriesService.update(id, createSubCategoryRequest);
        return subCategory.format()
    }

    @Delete(':id')
    @ApiHeader({ name: 'x-access-token' })
    @AdminPermission()
    public deleteProduct(@Param('id') id: string): Promise<void> {
        return this.subCategoriesService.delete(id);
    }
}
