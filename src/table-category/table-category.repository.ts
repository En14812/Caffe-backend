import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { TableCategoryDTO, UpdatedTableCategoryDTO } from "src/shared/dto/tableCategory.dto";
import { TableCategory, TableCategoryDocument } from "src/shared/schemas/tableCategory.schema";

@Injectable()
export class TableCategoryRepository {
    constructor(
        @InjectModel(TableCategory.name) private tableCategoryModel: Model<TableCategoryDocument>
    ) {}

    async findAll() {
        const res = this.tableCategoryModel.find().lean().exec();
        return res;
    }

    async findByPaging(
        filter: any,
        sort: any,
        skip: number,
        limit: number
    ): Promise<TableCategory[]> {
        const res = this.tableCategoryModel
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();

        return res;
    }

    async countDocs(filter: any): Promise<number> {
        return this.tableCategoryModel.countDocuments(filter).exec();
    }

    async create(dto: TableCategoryDTO) {
        const res = await this.tableCategoryModel.create({
            name: dto.name
        });

        return res;
    }

    async update(
        id: string,
        dto: UpdatedTableCategoryDTO
    ) {
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException("Invalid product ID");
        }
        
        const updatedData = await this.tableCategoryModel.findByIdAndUpdate(
            id,
            { $set: dto }, //$set to access to tranfered feilds
            { returnDocument: 'after' }
        )
        .exec();

        if (!updatedData) {
            throw new NotFoundException(`${id} not found`);
        }

        return updatedData;
    }

    async delete(id: string) {
        const res = await this.tableCategoryModel.findByIdAndDelete(id).exec();

        if (!res) {
            throw new NotFoundException(`ID ${id} not found`);
        }

        return res;
    }
}