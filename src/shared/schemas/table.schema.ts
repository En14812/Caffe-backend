import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { TableCategory } from "./tableCategory.schema";

export type TableDocument = HydratedDocument<Table>;

@Schema({
    collection: 'TABLE',
    timestamps: false,
})
export class Table {
    @Prop({required: true})
    name!: string;
    
    @Prop({
        type: Types.ObjectId, 
        ref: TableCategory.name, 
        required: true
    })
    tableCategory!: Types.ObjectId;

    @Prop({required: true})
    status!: string;
}
 
export const TableSchema = SchemaFactory.createForClass(Table)