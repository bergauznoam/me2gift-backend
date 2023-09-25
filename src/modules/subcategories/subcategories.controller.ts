import { SubCategoriesService } from '@services/subcategories.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SubCategoryDto } from '@DTOs/SubCategory.dto';
import { CreateSubCategory } from '@DTOs/SubCategory.dto';

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
    public async getSubcategory(
        @Param('id') id: string
    ): Promise<SubCategoryDto> {
        return this.subCategoriesService.getById(id);
    }

    @Post()
    public async createSubCategory(
        @Body() createSubCategoryRequest: CreateSubCategory
    ): Promise<SubCategoryDto> {
        return this.subCategoriesService.create(createSubCategoryRequest);
    }

    @Post(':id')
    public async updateSubcategory(
        @Param('id') id: string,
        @Body() createSubCategoryRequest: CreateSubCategory
    ): Promise<SubCategoryDto> {
        return this.subCategoriesService.update(id, createSubCategoryRequest);
    }
}
