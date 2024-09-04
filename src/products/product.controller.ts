import { Controller, Get, Post, Put, Delete, Body, Param, Query,  NotFoundException, BadRequestException } from '@nestjs/common';
import { ProductsService } from './product.services';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './product.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto): Product {
    try {
      return this.productsService.create(createProductDto);
    } catch (error) {
      throw new BadRequestException('Error creating product');
    }
  }

  @Get()
  findAll(
    @Query('cursor') cursor?: string,
    @Query('limit') limit: number = 10,
  ): Product[] {
    try {
      return this.productsService.findAll(cursor, limit);
    } catch (error) {
      throw new BadRequestException('Error fetching products');
    }
  }

  @Get(':id')
  findOne(@Param('id') id: string): Product {
    try {
      return this.productsService.findOne(id);
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto): Product {
    try {
      return this.productsService.update(id, updateProductDto);
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found or unable to update`);
    }
  }

  @Delete(':id')
  remove(@Param('id') id: string): void {
    try {
      this.productsService.remove(id);
    } catch (error) {
      throw new NotFoundException(`Product with ID ${id} not found or unable to delete`);
    }
  }

  @Get('search')
  search(@Query('query') query: string): Product[] {
    try {
      return this.productsService.search(query);
    } catch (error) {
      throw new BadRequestException('Error searching products');
    }
  }
}