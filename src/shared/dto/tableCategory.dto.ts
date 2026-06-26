import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class TableCategoryDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;
}

export class UpdatedTableCategoryDTO {
    @IsString()
    @IsOptional()
    name?: string;
}

export class TableCategoryPagingDTO {
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
}