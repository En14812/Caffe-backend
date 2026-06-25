import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { Product, ProductSchema } from 'src/shared/schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { Category, CategorySchema } from 'src/shared/schemas/category.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: Category.name, schema: CategorySchema }
    ])
  ],
  controllers: [ProductController],
  providers: [
    ProductService,
    ProductRepository
  ],
  exports: [ProductService]
})
export class ProductModule {}
