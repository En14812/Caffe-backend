import { Type } from "class-transformer";
import { IsString, IsNotEmpty, IsNumber, IsOptional, IsBoolean, Min } from "class-validator";

export class TableDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    status!: string;

    @IsString()
    @IsNotEmpty()
    tableCategory!: string;
}

export class UpdateTableDTO {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    status?: string;

    @IsString()
    @IsOptional()
    tableCategory?: string;
}

export class TablePagingDTO {
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
    tableCategory?: string = '';
}