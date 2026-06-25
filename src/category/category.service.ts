import { Injectable } from '@nestjs/common';
import { CategoryRepository } from './category.repository';

@Injectable()
export class CategoryService {

    constructor(
        private readonly categoryRepository: CategoryRepository
    ) {}

    async findAll() {
        const res = this.categoryRepository.findAll();
        return res;
    }
}
