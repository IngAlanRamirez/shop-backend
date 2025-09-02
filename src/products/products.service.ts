import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  // Create a new product
  create(createProductDto: CreateProductDto) {
    const product = this.productsRepository.create(createProductDto);
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
