import { SubCategoriesService } from '@services/subcategories.service';
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SubCategoryDto } from '@DTOs/SubCategory.dto';
import { CreateSubCategory } from '@DTOs/CreateSubCategory.dto';

@Controller("subcategories")
@ApiTags("SubCategories")
export class SubCategoriesController {
    constructor(
        private readonly subCategoriesService: SubCategoriesService
    ) { }

    @Get()
    public async getSubcategories(): Promise<SubCategoryDto[]> {
        const subCategories = await this.subCategoriesService.get();
        return subCategories.map(sub => ({ ...sub, categoryId: sub.category.id }));
    }

    @Get(':id')
    public async getSubcategory(
        @Param('id') id: string
    ): Promise<SubCategoryDto> {
        const subCategories = await this.subCategoriesService.getById(id);
        return { ...subCategories, categoryId: subCategories.category.id };
    }

    @Post()
    public async createSubCategory(
        @Body() createSubCategoryRequest: CreateSubCategory
    ): Promise<SubCategoryDto> {
        const subCategory = await this.subCategoriesService.create(createSubCategoryRequest);
        const subCategoryResponse: SubCategoryDto = { ...subCategory, categoryId: subCategory.category.id };
        return subCategoryResponse;
    }
}
