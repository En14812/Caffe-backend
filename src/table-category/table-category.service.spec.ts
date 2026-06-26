import { Test, TestingModule } from '@nestjs/testing';
import { TableCategoryService } from './table-category.service';

describe('TableCategoryService', () => {
  let service: TableCategoryService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TableCategoryService],
    }).compile();

    service = module.get<TableCategoryService>(TableCategoryService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
