import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { Role, RoleDocument } from 'src/shared/schemas/role.schema';
import { User, UserDocument } from 'src/shared/schemas/user.schema';
import { UserRepository } from './user.repository';
import { UpdateUserDTO, UserDTO } from 'src/shared/dto/user.dto';
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
