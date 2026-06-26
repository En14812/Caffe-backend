import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ProductModule } from './product/product.module';
import { RoleController } from './role/role.controller';
import { RoleService } from './role/role.service';
import { RoleModule } from './role/role.module';
import { CategoryModule } from './category/category.module';
import { TableModule } from './table/table.module';
import { TableCategoryModule } from './table-category/table-category.module';

@Module({
  imports: [
    UserModule,
    ProductModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        uri: configService.get<string>('MONGO_URL'), 
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    RoleModule,
    CategoryModule,
    TableModule,
    TableCategoryModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
