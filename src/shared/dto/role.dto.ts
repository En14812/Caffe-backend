import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString, Min } from "class-validator";

export class RoleDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;
}

export class RolePagingDTO {
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
    name?: string = '';
}