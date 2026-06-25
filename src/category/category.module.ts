import { Module } from '@nestjs/common';
import { CategoryController } from './category.controller';
import { CategoryService } from './category.service';
import { CategoryRepository } from './category.repository';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/shared/schemas/category.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Category.name, schema: CategorySchema }
    ])
  ],
  controllers: [CategoryController],
  providers: [
    CategoryService,
    CategoryRepository
  ],
  exports: [CategoryService]
})
export class CategoryModule {}
