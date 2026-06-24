import { Body, Controller, Delete, Get, Param, Patch, Post, Put, Query, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { UpdateUserDTO, UserDTO, UserPagingDTO } from 'src/shared/dto/user.dto';
import { AuthGuard } from 'src/auth/guards/auth.guard';

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService
    ) {}

    @UseGuards(AuthGuard)
    @Get('all')
    findAll() {
        const res = this.userService.findAll();
        return res;
    }

    @UseGuards(AuthGuard)
    @Get('users-paging')
    getUsersPaging(
        @Query() query: UserPagingDTO
    ) {
        const res = this.userService.findByPaging(query);
        return res;
    }

    @UseGuards(AuthGuard)
    @Post('create')
    createUser(
        @Body() dto: UserDTO
    ) {
        const res = this.userService.createUser(dto);
        console.log("create user: ", dto)
        return res;
    }

    @UseGuards(AuthGuard)
    @Put('update/:id')
    updateUser(
        @Param('id') id: string,
        @Body() dto: UpdateUserDTO
    ) {
        const res = this.userService.updateUser(id, dto);
        return res;
    }

    @Patch('update-partial/:id')
    updatePartial(
        @Param('id') id: string,
        @Body() dto: UpdateUserDTO
    ) {
        const res = this.userService.updateUser(id, dto);
        return res;
    }

    @Patch('update-password/:id')
    updatePassword(
        @Param('id') id: string,
        @Body() dto: UpdateUserDTO
    ) {
        const res = this.userService.updateUser(id, dto);
        return res;
    }

    @Patch('update-role/:id')
    updateRole(
        @Param('id') id: string,
        @Body() dto: UpdateUserDTO
    ) {
        const res = this.userService.updateUser(id, dto);
        return res;
    }

    @UseGuards(AuthGuard)
     @Delete('delete/:id')
     async deleteUser(
        @Param('id') id: string
     ) {
        const res = await this.userService.deleteUser(id);
        return {
            statusCode: 200,
            message: `User '${res.name}' has been successfully deleted`,
        };
     }
}