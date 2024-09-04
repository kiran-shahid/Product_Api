import { Injectable, NotFoundException } from '@nestjs/common';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductsService {
  private products: Map<string, Product> = new Map();

  create(createProductDto: CreateProductDto): Product {
    const id = uuidv4();
    const product = { id, ...createProductDto };
    this.products.set(id, product);
    return product;
  }

  findAll(cursor?: string, limit: number = 10): Product[] {
    let result = Array.from(this.products.values());

    if (cursor) {
      const cursorIndex = result.findIndex((product) => product.id === cursor);
      if (cursorIndex > -1) {
        result = result.slice(cursorIndex + 1);
      }
    }

    return result.slice(0, limit);
  }

  findOne(id: string): Product {
    const product = this.products.get(id);
    if (!product) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    return product;
  }

  update(id: string, updateProductDto: UpdateProductDto): Product {
    if (!this.products.has(id)) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    const updatedProduct = { ...this.products.get(id), ...updateProductDto };
    this.products.set(id, updatedProduct);
    return updatedProduct;
  }

  remove(id: string): void {
    if (!this.products.has(id)) {
      throw new NotFoundException(`Product with ID ${id} not found`);
    }
    this.products.delete(id);
  }

  search(query: string): Product[] {
    return Array.from(this.products.values()).filter(
      (product) =>
        product.name.toLowerCase().includes(query.toLowerCase())
    );
  }
}
