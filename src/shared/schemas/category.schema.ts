import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
    collection: 'CATEGORY',
    timestamps: false,
})
export class Category {
    @Prop({required: true})
    name!: string;

    @Prop()
    destination?: string;

    @Prop({required: true})
    index!: number;
}

export const CategorySchema = SchemaFactory.createForClass(Category);