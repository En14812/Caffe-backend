import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { CategoryDTO, UpdatedCategoryDTO } from "src/shared/dto/category.dto";
import { Category, CategoryDocument } from "src/shared/schemas/category.schema";

@Injectable()
export class CategoryRepository {
    constructor(
        @InjectModel(Category.name) private readonly categoryModel: Model<CategoryDocument> 
    ) {}

    async findAll(): Promise<Category[]> {
        const res = this.categoryModel.find().lean().exec();
        return res;
    }

    async findByPaging(
        filter: any,
        sort: any,
        skip: number,
        limit: number
    ): Promise<Category[]> {
        const res = this.categoryModel
        .find(filter)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .lean()
        .exec();

        return res;
    }

    async countCategorires(filter: any): Promise<number> {
        return this.categoryModel.countDocuments(filter).exec();
    }

    async createCategory(dto: CategoryDTO) {
        const res = await this.categoryModel.create({
            name: dto.name,
            destination: dto.destination,
        });

        return res;
    }

    async updateCategory(
        id: string,
        dto: UpdatedCategoryDTO
    ) {
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException("Invalid product ID");
        }
        
        const updatedData = await this.categoryModel.findByIdAndUpdate(
            id,
            { $set: dto },
            { returnDocument: 'after' }
        )
        .exec();

        if (!updatedData) {
            throw new NotFoundException(`Category ${id} not found`);
        }

        return updatedData;
    }

    async deleteCategory(id: string) {
        const res = await this.categoryModel.findByIdAndDelete(id).exec();

        if (!res) {
            throw new NotFoundException(`Category with ID ${id} not found`);
        }

        return res;
    }
}