import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { TableService } from './table.service';
import { TableDTO, TablePagingDTO } from 'src/shared/dto/table..dto';
import { UpdatedProductDTO } from 'src/shared/dto/product.dto';

@Controller('table')
export class TableController {
    constructor(
        private service: TableService
    ) {}

    @Get('all')
    findAll() {
        const res = this.service.findAll();
        return res;
    }

    @Get('tables-paging')
    getTablesPaging(
        @Query() query: TablePagingDTO
    ) {
        const res = this.service.findByPaging(query);
        return res;
    }

    @Post('create')
    createTable(
        @Body() dto: TableDTO
    ) {
        const res = this.service.create(dto);
        return res;
    }

    @Put('update/:id')
    updateTable(
        @Param('id') id: string,
        @Body() dto: UpdatedProductDTO
    ) {
        const res = this.service.update(id, dto);
        return res;
    }

    @Delete('delete/:id')
    async deletetTable(
        @Param('id') id: string
    ) {
        const res = await this.service.delete(id);
        return {
            statusCode: 'SUCCESS',
            message: `'${res.name}' has been successfully deleted`,
        };
    }
}
