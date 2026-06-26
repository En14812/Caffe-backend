import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TableCategoryService } from './table-category.service';
import { TableCategoryDTO, TableCategoryPagingDTO, UpdatedTableCategoryDTO } from 'src/shared/dto/tableCategory.dto';

@Controller('table-category')
export class TableCategoryController {
    constructor(
        private service: TableCategoryService
    ) {}

    @Get('tableCategories')
    findAll() {
        const res = this.service.findAll();
        return res;
    }

    @Get('tableCategories-paging')
    getDataPaging(
        @Query() query: TableCategoryPagingDTO
    ) {
        const res = this.service.findByPaging(query);
        return res;
    }

    @Post('create')
    createProduct(
        @Body() dto: TableCategoryDTO
    ) {
        const res = this.service.create(dto);
        return res;
    }

    @Put('update/:id')
    updateProduct(
        @Param('id') id: string,
        @Body() dto: UpdatedTableCategoryDTO
    ) {
        const res = this.service.update(id, dto);
        return res;
    }

    @Delete('delete/:id')
    async deleteProduct(
        @Param('id') id: string
    ) {
        const res = await this.service.delete(id);
        return {
            statusCode: 'SUCCESS',
            message: `'${res.name}' has been successfully deleted`,
        };
    }
}
