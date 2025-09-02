import { Injectable } from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}

  // Create Sale
  create(createSaleDto: CreateSaleDto) {
    const sale = this.salesRepository.create(createSaleDto);
    return this.salesRepository.save(sale);
  }

  // Get All Sales
  findAll() {
    return this.salesRepository.find();
  }

  // Get Sale by ID
  findOne(id: number) {
    return this.salesRepository.findOne({ where: { id } });
  }

  // Update Sale
  update(id: number, updateSaleDto: UpdateSaleDto) {
    return this.salesRepository.update(id, updateSaleDto as Partial<Sale>);
  }

  // Remove Sale
  remove(id: number) {
    return this.salesRepository.delete(id);
  }
}
