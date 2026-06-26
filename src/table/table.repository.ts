import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { TableDTO, UpdateTableDTO } from "src/shared/dto/table..dto";
import { Table, TableDocument } from "src/shared/schemas/table.schema";

@Injectable()
export class TableRepository {
    constructor(
        @InjectModel(Table.name) private tableModel: Model<TableDocument>
    ) {}

    async findAll() {
        const res = this.tableModel.find().lean().exec();
        return res;
    }

   async findByPaging(
        filter: any,
        sort: any,
        skip: number,
        limit: number
    ): Promise<Table[]> {
        const res = this.tableModel
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .populate('tableCategory')
        .lean()
        .exec();

        return res;
    }

    async countDocs(filter: any): Promise<number> {
        return this.tableModel.countDocuments(filter).exec();
    }

    async create(dto: TableDTO) {
        const res = await this.tableModel.create({
            name: dto.name,
            tableCategory: new Types.ObjectId(dto.tableCategory),
            status: dto.status
        });

        return res;
    }

    async update(
        id: string,
        dto: UpdateTableDTO
    ) {
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException("Invalid product ID");
        }
        
        const updatedData = await this.tableModel.findByIdAndUpdate(
            id,
            { $set: dto }, //$set to access to tranfered feilds
            { returnDocument: 'after' }
        )
        .populate('tableCategory')
        .exec();

        if (!updatedData) {
            throw new NotFoundException(`Table ${id} not found`);
        }

        return updatedData;
    }

    async delete(id: string) {
        const res = await this.tableModel.findByIdAndDelete(id).exec();

        if (!res) {
            throw new NotFoundException(`Table with ID ${id} not found`);
        }

        return res;
    }
}