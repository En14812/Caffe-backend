import { Module } from '@nestjs/common';
import { TableController } from './table.controller';
import { TableService } from './table.service';
import { Table, TableSchema } from 'src/shared/schemas/table.schema';
import { TableRepository } from './table.repository';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Table.name, schema: TableSchema }
    ])
  ],
  controllers: [TableController],
  providers: [
    TableService,
    TableRepository
  ],
  exports: [TableService]
})
export class TableModule {}
