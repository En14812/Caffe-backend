import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role, RoleDocument } from 'src/shared/schemas/role.schema';
import { User, UserDocument } from 'src/shared/schemas/user.schema';
import { UserRepository } from './user.repository';
import { UpdateUserDTO, UserDTO, UserPagingDTO } from 'src/shared/dto/user.dto';
import { hashPassword } from 'src/shared/utils/password.util';
import { RoleRepository } from 'src/role/role.repository';

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository,
        private readonly roleRepository: RoleRepository
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
        const [rawData, total] = await Promise.all([
            this.userRepository.findUsersPaging(filter, sortOptions, skip, limit),
            this.userRepository.countUsers(filter),
        ]);

        //mapping data:
        const mappedData = rawData.map((user: any) => ({
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
            data: mappedData,
        }
    }

    async createUser(dto: UserDTO) {
        const userRole = await this.roleRepository.findByName(dto.role);
        
        const userPayLoad: UserDTO = {
            name: dto.name,
            password: dto.password,
            email: dto.email,
            phone: dto.phone,
            role: userRole!._id.toString()
        }

        const res = await this.userRepository.createUser(userPayLoad);
        return {
            message: 'Create user successfully',
            statusCode: 'SUCCESS',
            meta: null,
            data: {
                id: res._id.toString(),
                name: res.name,
                email: res.email
            }
        };
    }

    async updateUser(
        id: string,
        dto: UpdateUserDTO
    ) {
        const updatedData: any = {...dto};

        console.log("updatedData",updatedData);

        if (dto.password) {
            updatedData.password = await hashPassword(dto.password);
        }

        if (dto.role) {
            const userRole = await this.roleRepository.findByName(dto.role);

            if (!userRole) {
                throw new BadRequestException('Invalid Role ID format');
            }

            updatedData.role = userRole._id;
        }

        const res: any = await this.userRepository.updateUser(id, updatedData);
        return {
            message: 'Update user successfully',
            statusCode: 'SUCCESS',
            meta: null,
            data: {
                id: res._id.toString(),
                name: res.name,
                email: res.email,
                phone: res.phone || '',
                role: res.role?.name || '', // Trả lại chữ "KITCHEN" cho Frontend hiển thị
            }
        };
    }

    async deleteUser(id: string) {
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException('Invalid User ID format');
        }
        
        const res = await this.userRepository.deleteUser(id);
        return res;
    }
}
