import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDTO } from 'src/shared/dto/user.dto';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) {}

    @Get('all')
    findAll() {
        const res = this.userService.findAll();
        return res;
    }

    @Post('create')
    createUser(
        @Body() dto: UserDTO
    ) {
        const res = this.userService.createUser(dto);
        return res;
    }

    @Put('update')
    updateUser() {
        const res = this.userService.updateUser();
        return res;
    }

     @Delete('delete')
     deleteUser() {
        const res = this.userService.deleteUser();
        return res;
     }
}