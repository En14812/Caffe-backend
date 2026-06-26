import { Module } from '@nestjs/common';
import { TableCategoryController } from './table-category.controller';
import { TableCategoryService } from './table-category.service';
import { TableCategory, TableCategorySchema } from 'src/shared/schemas/tableCategory.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { TableCategoryRepository } from './table-category.repository';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: TableCategory.name, schema: TableCategorySchema }
    ])
  ],
  controllers: [TableCategoryController],
  providers: [
    TableCategoryService,
    TableCategoryRepository
  ],
  exports: [TableCategoryService]
})
export class TableCategoryModule {}
