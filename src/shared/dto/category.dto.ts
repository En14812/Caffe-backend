import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class CategoryDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsOptional()
    destination?: string;
}

export class UpdatedCategoryDTO {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    destination?: string;
}

export class CategoryPagingDTO {
    @IsOptional()
        @Type(() => Number)
        @IsNumber()
        @Min(1)
        page?: number = 1;
        
        @IsOptional()
        @Type(() => Number)
        @IsNumber()
        @Min(1)
        size?: number = 25;
    
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