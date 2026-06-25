import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class RoleDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    destination?: string;

    @IsNumber()
    @IsNotEmpty()
    index!: number;
}