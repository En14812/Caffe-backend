import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model, Types } from 'mongoose';
import { UserDTO } from 'src/shared/dto/user.dto';
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

  findUserByName(name: string) {
    const res = this.userModel.findOne({ name }).exec();
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

  updateUser() {

  }

  deleteUser() {
    
  }
}