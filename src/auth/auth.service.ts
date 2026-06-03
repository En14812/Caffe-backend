import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/shared/schemas/user.schema';
import { UserService } from 'src/user/user.service';
import { AuthResponse, SignInData } from './auth.types';
import { LoginUserDTO } from 'src/shared/dto/user.dto';
import { comparePassword } from 'src/shared/utils/password.util';


@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async authenticate(input: LoginUserDTO): Promise<AuthResponse> {
        const user = await this.validateUser(input);

        if(!user) {
            throw new UnauthorizedException();
        }

        const authResponse = await this.signIn(user);

        return authResponse;
    }

    async validateUser(input: LoginUserDTO): Promise<SignInData | null> {
        const user = await this.userService.findUserByName(input.name);
        
        if (!user || user.password !== input.password) {
            return null;
        }
        
        const passwordMatches = await comparePassword(
            input.password, 
            user.password
        );

        if (!passwordMatches) {
            return null;
        }

        return {
            userId: user._id.toString(),
            name: user.name
        };
    }

    async signIn(user: SignInData): Promise<AuthResponse> {
        const tokenPayload = { 
            sub: user.userId, 
            name: user.name 
        };

        const accessToken = await this.jwtService.signAsync(tokenPayload);
        return {
            accessToken,
            userId: user.userId,
            name: user.name
        }
    }
}
