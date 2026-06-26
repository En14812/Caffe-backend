import { Injectable, NotFoundException } from '@nestjs/common';
import { CategoryRepository } from './category.repository';
import { CategoryDTO, CategoryPagingDTO, UpdatedCategoryDTO } from 'src/shared/dto/category.dto';
import { Types } from 'mongoose';

@Injectable()
export class CategoryService {

    constructor(
        private readonly categoryRepository: CategoryRepository
    ) {}

    async findAll() {
        const res = this.categoryRepository.findAll();
        return res;
    }

    async findByPaging(
        query: CategoryPagingDTO
    ) {
        const { page, size, sortBy, sortDirection, keyword } = query;
    
        const filter: any = {};

        if (keyword) {
            filter.name = { $regex: query.keyword, $options: 'i' }; 
        }

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
            this.categoryRepository.findByPaging(filter, sortOptions, skip, limit),
            this.categoryRepository.countCategorires(filter),
        ]);

        const mappedData = rawData.map((category: any) => ({
            id: category._id.toString(),
            name: category.name,
            destination: category.destination,
            // index: category.index
        }))

        return {
            message: 'Get categories paging successfully',
            statusCode: 'SUCCESS',
            meta: {
                total: total,
                page: page,
                size: size,
            },
            data: mappedData,
        }
    }

    async createCategory(dto: CategoryDTO) {
        const res = await this.categoryRepository.createCategory(dto);
        return res;
    }

    async updateCategory(
        id: string,
        dto: UpdatedCategoryDTO
    ) {
        const updatedData: any = {...dto}

        const res = await this.categoryRepository.updateCategory(id, updatedData);
        return res;
    }
    
    async deleteCategory(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException("Invalid product ID");
        }
        
        const res = await this.categoryRepository.deleteCategory(id);
        return res;
    }
}
