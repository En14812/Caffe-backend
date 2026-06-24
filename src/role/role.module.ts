import { Module } from '@nestjs/common';
import { RoleController } from './role.controller';
import { RoleRepository } from './role.repository';
import { RoleService } from './role.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Role, RoleSchema } from 'src/shared/schemas/role.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Role.name, schema: RoleSchema }
        ])
    ],
    controllers: [RoleController],
    providers: [
        RoleService,
        RoleRepository,
    ],
    exports: [RoleService]
})
export class RoleModule {}
