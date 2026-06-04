import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { ProductCategory } from "./productCategory.schema";

export type ProductDocument = HydratedDocument<Product>;

@Schema({
    collection: 'PRODUCT',
    timestamps: false,
})
export class Product {
    @Prop({required: true})
    name!: string;

    @Prop({
        type: Types.ObjectId, 
        ref: ProductCategory.name, 
        required: true
    })
    category!: Types.ObjectId

    @Prop({
        required: true, 
        type: Number
    })
    price!: number;

    @Prop()
    description?: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product)