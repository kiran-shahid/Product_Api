import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './product.services';
import { Product } from './product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('create', () => {
    it('should create a product', () => {
      const createProductDto: CreateProductDto = {
          name: 'Test Product', price: 100,
          category: ''
      };
      const result = service.create(createProductDto);
      expect(result).toHaveProperty('id');
      expect(result.name).toBe(createProductDto.name);
      expect(result.price).toBe(createProductDto.price);
    });
  });

  describe('findAll', () => {
    it('should return all products', () => {
      const createProductDto1: CreateProductDto = {
          name: 'Product 1', price: 100,
          category: ''
      };
      const createProductDto2: CreateProductDto = {
          name: 'Product 2', price: 200,
          category: ''
      };
      service.create(createProductDto1);
      service.create(createProductDto2);
      
      const products = service.findAll();
      expect(products.length).toBe(2);
    });

    it('should return paginated products', () => {
      service.create({
          name: 'Product 1', price: 100,
          category: ''
      });
      service.create({
          name: 'Product 2', price: 200,
          category: ''
      });
      service.create({
          name: 'Product 3', price: 300,
          category: ''
      });

      const products = service.findAll('', 2);
      expect(products.length).toBe(2);
    });
  });

  describe('findOne', () => {
    it('should return a product by ID', () => {
      const createProductDto: CreateProductDto = {
          name: 'Test Product', price: 100,
          category: ''
      };
      const createdProduct = service.create(createProductDto);
      
      const product = service.findOne(createdProduct.id);
      expect(product).toEqual(createdProduct);
    });

    it('should throw an error if product not found', () => {
      expect(() => service.findOne('invalid-id')).toThrowError('Product with ID invalid-id not found');
    });
  });

  describe('update', () => {
    it('should update a product', () => {
      const createProductDto: CreateProductDto = {
          name: 'Old Name', price: 100,
          category: ''
      };
      const createdProduct = service.create(createProductDto);
      
      const updateProductDto: UpdateProductDto = { name: 'New Name', price: 200 };
      const updatedProduct = service.update(createdProduct.id, updateProductDto);
      
      expect(updatedProduct.name).toBe('New Name');
      expect(updatedProduct.price).toBe(200);
    });

    it('should throw an error if product not found for update', () => {
      const updateProductDto: UpdateProductDto = { name: 'New Name', price: 200 };
      expect(() => service.update('invalid-id', updateProductDto)).toThrowError('Product with ID invalid-id not found');
    });
  });

  describe('remove', () => {
    it('should remove a product', () => {
      const createProductDto: CreateProductDto = {
          name: 'Product to Remove', price: 100,
          category: ''
      };
      const createdProduct = service.create(createProductDto);
      
      service.remove(createdProduct.id);
      expect(() => service.findOne(createdProduct.id)).toThrowError('Product with ID ' + createdProduct.id + ' not found');
    });

    it('should throw an error if product not found for removal', () => {
      expect(() => service.remove('invalid-id')).toThrowError('Product with ID invalid-id not found');
    });
  });

  describe('search', () => {
    it('should return products matching the search query', () => {
      service.create({
          name: 'Product One', price: 100,
          category: ''
      });
      service.create({
          name: 'Product Two', price: 200,
          category: ''
      });
      
      const results = service.search('One');
      expect(results.length).toBe(1);
      expect(results[0].name).toBe('Product One');
    });
  });
});
