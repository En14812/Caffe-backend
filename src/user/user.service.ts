import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/shared/schemas/role.schema';
import { User, UserDocument } from 'src/shared/schemas/user.schema';
import { UserRepository } from './user.repository';
import { UserDTO } from 'src/shared/dto/user.dto';

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

    async updateUser() {
        const res = await this.userRepository.updateUser();
        return res;
    }

    async deleteUser() {
        const res = await this.userRepository.deleteUser();
        return res;
    }
}
