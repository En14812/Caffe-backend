import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument, Types } from "mongoose";
import { Role } from "./role.schema";

export type UserDocument = HydratedDocument<User>;

@Schema({
    collection: 'USER',
    timestamps: false,
})
export class User {
    @Prop({required: true})
    name!: string;
    
    @Prop({required: true})
    password!: string;

    @Prop({required: true})
    email!: string;

    @Prop()
    phone!: number;

    @Prop({
        type: Types.ObjectId, 
        ref: Role.name,
        required: true
    })
    role!: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);