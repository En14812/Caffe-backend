import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class ProductDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsNumber()
    @IsNotEmpty()
    price!: number

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsNotEmpty()
    category!: string;
}

export class UpdatedProductDTO {
    @IsString()
    @IsOptional()
    name?: string;

    @IsNumber()
    @IsOptional()
    price?: number

    @IsString()
    @IsOptional()
    description?: string;

    @IsString()
    @IsOptional()
    category?: string;
}