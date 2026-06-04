import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO, UserDTO } from 'src/shared/dto/user.dto';

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

    @Put('update/:id')
    updateUser(
        @Param('id') id: string,
        @Body() dto: UpdateUserDTO
    ) {
        const res = this.userService.updateUser(id, dto);
        return res;
    }

     @Delete('delete/:id')
     deleteUser(
        @Param('id') id: string
     ) {
        const res = this.userService.deleteUser(id);
        return res;
     }
}