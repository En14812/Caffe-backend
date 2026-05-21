import { Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) {}

    @Get('all')
    findAll() {
        const res = this.userService.findAll();
        console.log('res controller:', res);
        return res;
    }

    @Post('create')
    createUser() {
        const res = this.userService.createUser();
        return res;
    }

    @Put('update')
    updateUser() {
        const res = this.userService.updateUser();
        return res;
    }

     @Put('delete')
     deleteUser() {
        const res = this.userService.deleteUser();
        return res;
     }
}