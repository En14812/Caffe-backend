import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from 'src/shared/schemas/user.schema';
import { UserService } from 'src/user/user.service';

type AuthInput = {
    username: string;
    password: string;
}

type SignInData = {
    userId: string;
    username: string;
}

type AuthResponse = {
    accessToken: string;
    userId: string;
    username: string;
}

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async authenticate(input: AuthInput): Promise<AuthResponse> {
        const user = await this.validateUser(input);

        if(!user) {
            throw new UnauthorizedException();
        }

        const authResponse = await this.signIn(user);

        return authResponse;
    }

    async validateUser(input: AuthInput): Promise<SignInData | null> {
        const user = await this.userService.findUserByName(input.username);
        
        if (!user || user.password !== input.password) {
            return null;
        }
        
        return {
            userId: user._id.toString(),
            username: user.name
        };
    }

    async signIn(user: SignInData): Promise<AuthResponse> {
        const tokenPayload = { 
            sub: user.userId, 
            username: user.username 
        };

        const accessToken = await this.jwtService.signAsync(tokenPayload);
        return {
            accessToken,
            userId: user.userId,
            username: user.username
        }
    }
}
