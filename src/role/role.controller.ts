import { Controller, Get, Query } from '@nestjs/common';
import { RoleService } from './role.service';
import { RolePagingDTO } from 'src/shared/dto/role.dto';

@Controller('role')
export class RoleController {
    constructor (
        private roleService: RoleService
    ) {}

    @Get('getAll')
    findAll() {
        const res = this.roleService.findAll();
        return res;
    }

    @Get('role-paging')
    getRolesPaging(
        @Query() query: RolePagingDTO
    ) {
        const res = this.roleService.findByPaging(query);
        return res;
    }
}
