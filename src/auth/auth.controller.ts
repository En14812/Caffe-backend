import { Body, Controller, Get, HttpCode, HttpStatus, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';
import { LoginUserDTO } from 'src/shared/dto/user.dto';
import { AuthenticatedUser } from './auth.types';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(
        @Body()
        input: LoginUserDTO
    ) {
        const res = await this.authService.authenticate(input);
        return res;
    }
    
    @UseGuards(AuthGuard)
    @Get('account')
    async getUserInfo(@Request() request: { user: AuthenticatedUser }) {
        
        return {
            message: 'Get user successfully',
            statusCode: HttpStatus.OK.toString(),
            meta: null,
            data: {
                type: 'user',
                id: request.user.sub,
                name: request.user.name,
                role: request.user.role,
            },
        };
    }
}
