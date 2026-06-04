import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductDTO } from 'src/shared/dto/product.dto';
import { Types } from 'mongoose';

@Injectable()
export class ProductService {
    constructor(
        private productRepository: ProductRepository
    ) {}

    async findAllProducts() {
        const res = await this.productRepository.findAllProducts();
        return res;
    }

    async createProduct(
        dto: ProductDTO
    ) {
        const res = await this.productRepository.createProduct(dto);
        return res;
    }

    async updateProduct(
        id: string,
        dto: ProductDTO
    ) {
        const updatedData: any = {...dto};

        const res = await this.productRepository.updateProduct(id, updatedData);
        return res;
    }

    async deleteProduct(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException("Invalid product ID");
        }
        
        const res = await this.productRepository.deleteProduct(id);
        return res;
    }
}
