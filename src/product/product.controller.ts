import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO, ProductPagingDTO, UpdatedProductDTO } from 'src/shared/dto/product.dto';

@Controller('product')
export class ProductController {
    constructor(
        private productService: ProductService
    ) {}

    @Get('all')
    findAllProducts() {
        const res = this.productService.findAllProducts();
        return res;
    }

    @Get('products-paging')
    getProductsPaging(
        @Query() query: ProductPagingDTO
    ) {
        const res = this.productService.findByPaging(query);
        return res;
    }

    @Post('create')
    createProduct(
        @Body() dto: ProductDTO
    ) {
        const res = this.productService.createProduct(dto);
        return res;
    }

    @Put('update/:id')
    updateProduct(
        @Param('id') id: string,
        @Body() dto: UpdatedProductDTO
    ) {
        const res = this.productService.updateProduct(id, dto);
        return res;
    }

    @Delete('delete/:id')
    async deleteProduct(
        @Param('id') id: string
    ) {
        const res = await this.productService.deleteProduct(id);
        return {
            statusCode: 'SUCCESS',
            message: `Product '${res.name}' has been successfully deleted`,
        };
    }
}
