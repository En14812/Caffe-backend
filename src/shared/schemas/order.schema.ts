

import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Table } from "./table.schema";
import { User } from "./user.schema";

export type OrderDocument = HydratedDocument<Order>;

@Schema({
    collection: 'ORDER',
    timestamps: false,
})
export class Order {
    @Prop({
        type: Types.ObjectId,
        ref: Table.name,
        required: true,
    })
    table!: Types.ObjectId;

    @Prop({
        type: Types.ObjectId,
        ref: User.name,
        required: true,
    })
    user!: Types.ObjectId;

    @Prop({required: true})
    finalPrice!: number;

    @Prop({required: true})
    paymentType!: string;

    @Prop({required: true})
    createAt!: Date;

    @Prop()
    status!: string;
}

export const OrderSchema = SchemaFactory.createForClass(Order);