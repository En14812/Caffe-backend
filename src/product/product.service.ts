import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import { ProductDTO, ProductPagingDTO } from 'src/shared/dto/product.dto';
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

    async findByPaging(
        query: ProductPagingDTO
    ) {
        const { page, size, sortBy, sortDirection, keyword, category } = query;

        const filter: any = {};

        if (category) {
            filter.category = category
        }

        if (keyword) {
            filter.name = { $regex: query.keyword, $options: 'i' }; 
        }

        // calc sort
        const sortOptions: any = {};
        if (sortBy) {
            const actualSortKey = sortBy === 'id' ? '_id' : sortBy;
            sortOptions[actualSortKey] = sortDirection === 'ASC' ? 1 : -1;
        }
        else {
            sortOptions['_id'] = -1;
        }

         //calc paging
        const currentPage = query.page ?? 1;
        const pageSize = query.size ?? 10;

        const skip = (currentPage - 1) * pageSize;
        const limit = pageSize;

        //find data:
        const [rawData, total] = await Promise.all([
            this.productRepository.findByPaging(filter, sortOptions, skip, limit),
            this.productRepository.countProducts(filter),
        ]);

        const mappedData = rawData.map((product: any) => ({
            id: product._id.toString(),
            name: product.name,
            price: product.price,
            description: product.description || '',
            status: product.status,
            category: product.category
        }))

        return {
            message: 'Get products paging successfully',
            statusCode: 'SUCCESS',
            meta: {
                total: total,
                page: page,
                size: size,
            },
            data: mappedData,
        }
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
