import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role, RoleDocument } from 'src/shared/schemas/role.schema';
import { User, UserDocument } from 'src/shared/schemas/user.schema';
import { UserRepository } from './user.repository';
import { UpdateUserDTO, UserDTO, UserPagingDTO } from 'src/shared/dto/user.dto';
import { hashPassword } from 'src/shared/utils/password.util';

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository
    ) {}

    async findAll() {
        const res = await this.userRepository.findAll();
        return res;
    }

    async findUserByName(name: string) {
        const res = await this.userRepository.findUserByName(name);
        return res;
    }

    async findByPaging(
        query: UserPagingDTO
    ) {
        const { page, size, sortBy, sortDirection, keyword, role } = query;
        
        const filter: any = {};

        if (role) {
            filter.role = role;
        }

        if (keyword) {
            filter.$or = [
                { name: { $regex: keyword, $options: 'i' } },
                { email: { $regex: keyword, $options: 'i' } },
                { phone: { $regex: keyword, $options: 'i' } },
            ];
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
        const [rawUsers, total] = await Promise.all([
            this.userRepository.findUsersPaging(filter, sortOptions, skip, limit),
            this.userRepository.countUsers(filter),
        ]);

        //mapping data:
        const mappedUsers = rawUsers.map((user: any) => ({
            id: user._id.toString(),
            name: user.name,
            email: user.email || '',
            phone: user.phone || '',
            role: user.role?.name || '',
        }));

        return {
            message: 'Get users paging successfully',
            statusCode: 'SUCCESS',
            meta: {
                total: total,
                page: page,
                size: size,
            },
            data: mappedUsers,
        }
    }

    async createUser(dto: UserDTO) {
        const res = await this.userRepository.createUser(dto);
        return res;
    }

    async updateUser(
        id: string,
        dto: UpdateUserDTO
    ) {
        const updatedData: any = {...dto};

        if (dto.password) {
            updatedData.password = await hashPassword(dto.password);
        }

        if (dto.role) {
            if (!Types.ObjectId.isValid(dto.role)) {
                throw new BadRequestException('Invalid Role ID format');
            }
            updatedData.role = new Types.ObjectId(dto.role);
        }

        const res = await this.userRepository.updateUser(id, updatedData);
        return res;
    }

    async deleteUser(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException('Invalid User ID format');
        }
        
        const res = await this.userRepository.deleteUser(id);
        return res;
    }
}
