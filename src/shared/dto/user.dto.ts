import { IsEmail, IsNotEmpty, IsNumber, IsString, MinLength } from 'class-validator';

export class UserDTO {
    @IsString()
    @IsNotEmpty()
    name!: string;

    @IsString()
    @IsNotEmpty()
    password!: string;

    @IsEmail()
    email!: string;

    @IsNumber()
    phone!: number;

    @IsString()
    @IsNotEmpty()
    role!: string;
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

}

export class DeleteUserDTO {

}