import { Injectable } from '@nestjs/common';
import { RoleRepository } from './role.repository';
import { RolePagingDTO } from 'src/shared/dto/role.dto';

@Injectable()
export class RoleService {
    constructor(
        private readonly roleRepository: RoleRepository
    ) {}

    async findAll() {
        const res = this.roleRepository.findAll();
        return res;
    }

    async findByPaging(
        query: RolePagingDTO
    ) {
        const { page, size, sortBy, sortDirection, name } = query;

        const filter: any = {};
        if (name) {
            filter.name = { $regex: name, $options: 'i' };
        } 

        //cal sort
        const sortOptions: any = {};
        if (sortBy) {
            const actualSortKey = sortBy === 'id' ? '_id' : sortBy;
            sortOptions[actualSortKey] = sortDirection === 'ASC' ? 1 : -1;
        }
        else {
            sortOptions['_id'] = -1;
        }

        //calc paging
        const currentPage = page ?? 1;
        const pageSize = size ?? 25;

        const skip = (currentPage - 1) * pageSize;
        const limit = pageSize;

        //find data
        const [rawData, total] = await Promise.all([
            this.roleRepository.findByPaging(filter, sortOptions, skip, limit),
            this.roleRepository.countRoles(filter),
        ]);

        //mapping data
        const mappedData = rawData.map((role: any) => ({
            id: role._id.toString(),
            name: role.name
        }))

        return {
            message: 'Get roles paging successfully',
            statusCode: 'SUCCESS',
            meta: {
                total: total,
                page: page,
                size: size,
            },
            data: mappedData,
        }
    }
}
