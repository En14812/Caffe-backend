import { Type } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsNumber, IsOptional, IsString, Min, MinLength } from 'class-validator';

export class UserDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsEmail()
    email!: string;

    @IsString()
    phone!: string;

    @IsString()
    @IsNotEmpty()
    role!: string;
}

export class UserPagingDTO {
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
    role?: string = '';
}

export class LoginUserDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;
}

export class UpdateUserDTO {
    @IsString()
    @IsOptional()
    name?: string;

    @IsString()
    @IsOptional()
    password?: string;

    @IsEmail()
    @IsOptional()
    email?: string;

    @IsString()
    @IsOptional()
    phone?: string;

    @IsString()
    @IsOptional()
    role?: string;
}
