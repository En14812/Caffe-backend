import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductDTO } from 'src/shared/dto/product.dto';

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
        @Body() dto: ProductDTO
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
            statusCode: 200,
            message: `Product '${res.name}' has been successfully deleted`,
        };
    }
}
