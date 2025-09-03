import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
  ) {}

  // Create Sale
  async create(createSaleDto: CreateSaleDto) {
    const {
      products = [],
      userId,
      date,
    } = createSaleDto as {
      products?: { productId: number; quantity: number }[];
      userId: number;
      date?: string | Date;
    };

    // Usar transacción para que las actualizaciones de stock y la creación de la venta
    return await this.salesRepository.manager.transaction(async (manager) => {
      const prodRepo = manager.getRepository(Product);
      const userRepo = manager.getRepository(User);
      const saleRepo = manager.getRepository(Sale);

      // Load user inside transaction
      const user = await userRepo.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }

      // Cargar productos, validar stock, calcular total y actualizar stock
      const productEntities: Product[] = [];
      let total = 0;

      for (const p of products) {
        const prod = await prodRepo.findOne({ where: { id: p.productId } });
        if (!prod) {
          throw new NotFoundException(
            `Product with id ${p.productId} not found`,
          );
        }

        const qty = Number(p.quantity ?? 0);
        const available = Number(prod.stock_quantity ?? 0);
        if (qty <= 0) {
          throw new BadRequestException(
            `Invalid quantity for product ${p.productId}`,
          );
        }
        if (available < qty) {
          throw new BadRequestException(
            `Insufficient stock for product ${p.productId}`,
          );
        }

        prod.stock_quantity = available - qty;
        await prodRepo.save(prod);

        productEntities.push(prod);
        const price = Number(prod.price ?? 0);
        total += price * qty;
      }

      const sale = saleRepo.create({
        user,
        products: productEntities,
        total,
        date: date ? new Date(date as string) : undefined,
      } as Partial<Sale>);

      return saleRepo.save(sale);
    });
  }

  // Get All Sales
  findAll() {
    return this.salesRepository.find();
  }

  // Lista de todos los productos vendidos y el nombre del usuario que los vendió
  async findAllProductsSold() {
    const sales = await this.salesRepository.find({
      relations: ['products', 'user'],
    });
    return sales.flatMap((sale) =>
      sale.products.map((product) => ({
        ...product,
        user: sale.user.name,
      })),
    );
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
