import { Injectable, UnauthorizedException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/shared/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthResponse, SignInData } from './auth.types';
import { LoginUserDTO } from 'src/shared/dto/user.dto';
import { comparePassword, hashPassword } from 'src/shared/utils/password.util';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async authenticate(input: LoginUserDTO): Promise<any> {
        const user = await this.validateUser(input);

        console.log("authenticate user: ", user);

        if(!user) {
            throw new UnauthorizedException('Invalid credentials');
        }

        const authResponse = await this.signIn(user as any);

        return authResponse;
    }

    async validateUser(input: LoginUserDTO): Promise<User | null> {
        const user = await this.userService.findUserByName(input.name);
        
        if (!user) {
            console.error("user name not matched");
            return null;
        }

        const passwordMatches = await comparePassword(
            input.password,
            user.password
        );

        if (!passwordMatches) {
            console.error("password not matched");
            return null;
        }

        return user as any;
    }

    async signIn(user: any): Promise<any> {
        const roleName = user.role && typeof user.role === 'object' && user.role.name
            ? user.role.name
            : user.role?.toString();

        const tokenPayload = { 
            sub: user._id.toString(), 
            name: user.name,
            role: roleName
        };

        const accessToken = await this.jwtService.signAsync(tokenPayload);

        const response = {
            message: 'Login successful',
            statusCode: HttpStatus.OK.toString(),
            meta: null,
            data: {
                user: {
                    type: 'user',
                    id: user._id.toString(),
                    name: user.name,
                    role: roleName
                },
                access_token: accessToken
            }
        };

        return response;
    }
}
