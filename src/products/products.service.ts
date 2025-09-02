import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository, DeepPartial } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  // Create a new product
  create(createProductDto: CreateProductDto) {
    const dto: Partial<CreateProductDto> & Record<string, any> = {
      ...createProductDto,
    };

    if ('stock' in dto && !('stock_quantity' in dto)) {
      const raw = String(dto.stock || '');
      const m = raw.match(/(\d+)/);
      if (m) dto.stock_quantity = parseInt(m[1], 10);
    }

    if (!dto.sku) {
      dto.sku = `SKU-${Date.now().toString().slice(-6)}`;
    }

    const product = this.productsRepository.create(dto as DeepPartial<Product>);
    return this.productsRepository.save(product);
  }

  // Get all products
  findAll() {
    return this.productsRepository.find();
  }

  // Get a product by ID
  findOne(id: number) {
    return this.productsRepository.findOne({ where: { id } });
  }

  // Update a product by ID
  update(id: number, updateProductDto: UpdateProductDto) {
    return this.productsRepository.update(id, updateProductDto);
  }

  // Remove a product by ID
  remove(id: number) {
    return this.productsRepository.delete(id);
  }
}
