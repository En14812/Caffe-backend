import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
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
}