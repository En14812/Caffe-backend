import { Injectable, NotFoundException } from '@nestjs/common';
import { TableRepository } from './table.repository';
import { TableDTO, TablePagingDTO, UpdateTableDTO } from 'src/shared/dto/table..dto';
import { Types } from 'mongoose';

@Injectable()
export class TableService {
    constructor(
        private repository: TableRepository
    ) {}

    async findAll() {
        const res = await this.repository.findAll();
        return res;
    }
    
    async findByPaging(
        query: TablePagingDTO
    ) {
        const { page, size, sortBy, sortDirection, keyword, tableCategory } = query;

        const filter: any = {};

        if (tableCategory) {
            filter.category = tableCategory
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
            this.repository.findByPaging(filter, sortOptions, skip, limit),
            this.repository.countDocs(filter),
        ]);

        const mappedData = rawData.map((data: any) => ({
            id: data._id.toString(),
            name: data.name,
            status: data.status,
            category: {
                id: data.tableCategory?._id?.toString(),
                name: data.tableCategory?.name,
            }
        }))

        return {
            message: 'Get paging successfully',
            statusCode: 'SUCCESS',
            meta: {
                total: total,
                page: page,
                size: size,
            },
            data: mappedData,
        }
    }

    async create(
        dto: TableDTO
    ) {
        const res = await this.repository.create(dto);
        return res;
    }

    async update(
        id: string,
        dto: UpdateTableDTO
    ) {
        const updatedData: any = {...dto};

        const res = await this.repository.update(id, updatedData);
        return res;
    }

    async delete(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException("Invalid ID");
        }
        
        const res = await this.repository.delete(id);
        return res;
    }
}
