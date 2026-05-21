import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Role, RoleDocument } from 'src/shared/schemas/role.schema';
import { User, UserDocument } from 'src/shared/schemas/user.schema';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService {

    constructor(
        private readonly userRepository: UserRepository
    ) {}

    // async findAll(): Promise<User[]> {
    //     const res = await this.userModel.find().exec();
    //     console.log('res service:', res);
    //     return res;
    // }

    async findAll() {
        const res = await this.userRepository.findAll();
        console.log('res service:', res);
        return res;
    }

    async createUser() {
        const res = await this.userRepository.createUser();
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
