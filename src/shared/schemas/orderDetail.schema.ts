import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Order } from "./order.schema";
import { Product } from "./product.schema";

export type OrderDetailDocument = HydratedDocument<OrderDetail>;

@Schema({
    collection: 'ORDER_DETAIL',
    timestamps: false,
})
export class OrderDetail {
    @Prop({
        type: Types.ObjectId, 
        ref: Order.name, 
        required: true
    })
    order!: Types.ObjectId;

    @Prop({
        type: Types.ObjectId, 
        ref: Product.name, 
        required: true
    })
    product!: Types.ObjectId;

    @Prop({required: true})
    quantity!: number;

    @Prop({required: true})
    totalPrice!: number;

    @Prop()
    note!: string;

    @Prop({required: true})
    status!: string;
}

export const OrderDetailSchema = SchemaFactory.createForClass(OrderDetail);