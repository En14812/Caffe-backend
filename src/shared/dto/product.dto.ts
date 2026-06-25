import { Type } from "class-transformer";
import { IsBoolean, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

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

    @IsBoolean()
    @IsNotEmpty()
    status!: boolean;
}

export class ProductPagingDTO {
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    page?: number = 1;
    
    @IsOptional()
    @Type(() => Number)
    @IsNumber()
    @Min(1)
    size?: number = 10;

    @IsOptional()
    @IsString()
    sortBy?: string = '';

    @IsOptional()
    @IsString()
    sortDirection?: 'ASC' | 'DESC' = 'DESC';

    @IsOptional()
    @IsString()
    keyword?: string = '';

    @IsOptional()
    @IsString()
    category?: string = '';
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