import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { ProductRepository } from './product.repository';
import { Product, ProductSchema } from 'src/shared/schemas/product.schema';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductCategory, ProductCategorySchema } from 'src/shared/schemas/productCategory.schema';


@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Product.name, schema: ProductSchema },
      { name: ProductCategory.name, schema: ProductCategorySchema }
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
