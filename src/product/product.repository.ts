import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from "mongoose";
import { ProductDTO, UpdatedProductDTO } from "src/shared/dto/product.dto";
import { Product, ProductDocument } from "src/shared/schemas/product.schema";

@Injectable()
export class ProductRepository {
    constructor(
        @InjectModel(Product.name) private productModel: Model<ProductDocument>
    ) {}

    findAllProducts() {
        const res = this.productModel.find().exec();
        return res;
    }

    async createProduct(dto: ProductDTO) {
        const res = await this.productModel.create({
            name: dto.name,
            price: dto.price,
            description: dto.description,
            category: new Types.ObjectId(dto.category)
        });
        return res;
    }

    async updateProduct(
        id: string,
        dto: UpdatedProductDTO
    ) {
        if (!Types.ObjectId.isValid(id)) {
            throw new NotFoundException("Invalid product ID");
        }
        
        const updatedData = await this.productModel.findByIdAndUpdate(
            id,
            { $set: dto }, //$set to access to tranfered feilds
            { returnDocument: 'after' }
        )
        .populate('product_category')
        .exec();

        if (!updatedData) {
            throw new NotFoundException(`Product ${id} not found`);
        }

        return updatedData;
    }

    async deleteProduct(id: string) {
        const deletedProduct = await this.productModel.findByIdAndDelete(id).exec();

        if (!deletedProduct) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }

        return deletedProduct;
    }
}