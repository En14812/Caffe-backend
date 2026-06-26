import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { CategoryService } from './category.service';
import { CategoryDTO, CategoryPagingDTO, UpdatedCategoryDTO } from 'src/shared/dto/category.dto';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) {}

    @Get('categories')
    findAll() {
        const res = this.categoryService.findAll();
        return res;
    }

    @Get('categories-paging')
    getCategoriesPaging(
        @Query() query: CategoryPagingDTO
    ) {
        const res = this.categoryService.findByPaging(query);
        return res;
    }

    @Post('create')
    createCategory(
        @Body() dto: CategoryDTO
    ) {
        const res = this.categoryService.createCategory(dto);
        return res;
    }


    @Put('update/:id')
    updateCategory(
        @Param('id') id: string,
        @Body() dto: UpdatedCategoryDTO
    ) {
        const res = this.categoryService.updateCategory(id, dto);
        return res;
    }

    @Delete('delete/:id')
    deleteCategory(
        @Param('id') id: string,
    ) {
        const res = this.categoryService.deleteCategory(id);
        return {
            statusCode: 'SUCCESS',
            message: `Product has been successfully deleted`,
        };
    }
}
