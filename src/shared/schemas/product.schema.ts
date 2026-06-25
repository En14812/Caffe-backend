import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Category } from "./category.schema";

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
        ref: Category.name, 
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

    @Prop({
        required: true,
        type: Boolean
    })
    status!: boolean;
}

export const ProductSchema = SchemaFactory.createForClass(Product)