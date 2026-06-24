import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Role, RoleDocument } from "src/shared/schemas/role.schema";

@Injectable()
export class RoleRepository {
    constructor(
        @InjectModel(Role.name) private readonly roleModel: Model<RoleDocument> 
    ) {}

    findAll(): Promise<Role[]> {
        const res = this.roleModel.find().lean().exec();
        return res
    }

    async findByName(name: string) {
        return this.roleModel.findOne({ name: name }).lean().exec();
    }

    async findByPaging(
        filter: any,
        sort: any,
        skip: number,
        limit: number
    ): Promise<Role[]> {
        const res = this.roleModel
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();

        return res;
    }

    async countRoles(filter: any): Promise<number> {
        return this.roleModel.countDocuments(filter).exec();
    }

}