import { Controller, Get } from '@nestjs/common';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(
        private readonly categoryService: CategoryService
    ) {}

    @Get('categories')
    findAll() {
        const res = this.categoryService.findAll();
        return res;
    }
}
