import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UpdateUserDTO, UserDTO } from 'src/shared/dto/user.dto';
import { User, UserDocument } from 'src/shared/schemas/user.schema';
import { hashPassword } from 'src/shared/utils/password.util';

@Injectable()
export class UserRepository {
    constructor(
      @InjectModel(User.name) private readonly userModel: Model<UserDocument>
    ) {}

  findAll() {
    const res = this.userModel.find().exec();
    return res
  }

  async findUsersPaging(
    filter: any,
    sort: any,
    skip: number,
    limit: number
  ): Promise<User[]> {
    const res = this.userModel
    .find(filter)
    .sort(sort)
    .skip(skip)
    .limit(limit)
    .populate('role')
    .lean()
    .exec();
    
    return res;
  }

  async countUsers(filter: any): Promise<number> {
    return this.userModel.countDocuments(filter).exec();
  }

  findUserByName(name: string) {
    const res = this.userModel.findOne({ name }).populate('role').exec();
    return res;
  }

  async createUser(dto: UserDTO) {
    const hashedPassword = await hashPassword(dto.password);
    return this.userModel.create({
      name: dto.name,
      password: hashedPassword,
      email: dto.email,
      phone: dto.phone,
      role: new Types.ObjectId(dto.role),
    });
  }

  async updateUser(id: string, dto: UpdateUserDTO) {
    if (!Types.ObjectId.isValid(id)) {
        throw new NotFoundException('Invalid User ID format');
    }

    const updatedData = await this.userModel.findByIdAndUpdate(
      id,
      { $set: dto }, //$set to access to tranfered feilds
      { returnDocument: 'after' }
    )
    .populate('role')
    .exec();

    if (!updatedData) {
      throw new NotFoundException(`User ${id} not found`);
    }

    return updatedData;
  }
  

  async deleteUser(id: string) {
    const deletedUser = await this.userModel.findByIdAndDelete(id).exec();

    if (!deletedUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return deletedUser;
  }
}