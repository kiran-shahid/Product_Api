import { Module } from '@nestjs/common';
import { ProductsService } from './product.services';
import { ProductsController } from './product.controller';


@Module({
  providers: [ProductsService],
  controllers: [ProductsController],
})
export class ProductsModule {}
