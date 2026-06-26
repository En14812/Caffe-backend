import { Test, TestingModule } from '@nestjs/testing';
import { TableCategoryController } from './table-category.controller';

describe('TableCategoryController', () => {
  let controller: TableCategoryController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TableCategoryController],
    }).compile();

    controller = module.get<TableCategoryController>(TableCategoryController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
