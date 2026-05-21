import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type TableCategoryDocument = HydratedDocument<TableCategory>;

@Schema({
    collection: 'TABLE_CATEGORY',
    timestamps: false,
})
export class TableCategory {
    @Prop({required: true})
    name!: string;
}

export const TableCategorySchema = SchemaFactory.createForClass(TableCategory)