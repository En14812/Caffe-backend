import { Body, Controller, Get, HttpCode, HttpStatus, NotImplementedException, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './guards/auth.guard';

@Controller('auth')
export class AuthController {

    constructor(
        private authService: AuthService
    ) {}

    @HttpCode(HttpStatus.OK)
    @Post('login')
    async login(
        @Body()
        input: {username: string; password: string}
    ) {
        const res = await this.authService.authenticate(input);
        return res;
    }
    
    @UseGuards(AuthGuard)
    @Get('user')
    async getUserInfo(
        @Request() request
    ) {
        return request.user;
    }
}
