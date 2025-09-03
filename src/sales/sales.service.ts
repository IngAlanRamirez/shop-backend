import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleResponseDto } from './dto/sale-response.dto';
import { ProductSoldResponseDto } from './dto/products-sold-response.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Sale } from './entities/sale.entity';
import { SaleDetail } from './entities/sale-detail.entity';
import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';

@Injectable()
export class SalesService {
  constructor(
    @InjectRepository(Sale)
    private salesRepository: Repository<Sale>,
    @InjectRepository(SaleDetail)
    private saleDetailRepository: Repository<SaleDetail>,
  ) {}

  // Create Sale
  async create(createSaleDto: CreateSaleDto): Promise<SaleResponseDto> {
    const { products, userId, date } = createSaleDto;

    // Usar transacción para que las actualizaciones de stock y la creación de la venta
    return await this.salesRepository.manager.transaction(async (manager) => {
      const prodRepo = manager.getRepository(Product);
      const userRepo = manager.getRepository(User);
      const saleRepo = manager.getRepository(Sale);
      const saleDetailRepo = manager.getRepository(SaleDetail);

      // Cargar usuario dentro de la transacción
      const user = await userRepo.findOne({ where: { id: userId } });
      if (!user) {
        throw new NotFoundException(`User with id ${userId} not found`);
      }

      // Cargar productos, validar stock, calcular total y actualizar stock
      const saleDetails: SaleDetail[] = [];
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

        // Actualizar stock
        prod.stock_quantity = available - qty;
        await prodRepo.save(prod);

        // Calcular subtotal
        const price = Number(prod.price ?? 0);
        const subtotal = price * qty;
        total += subtotal;

        // Crear detalle de venta
        const saleDetail = saleDetailRepo.create({
          product: prod,
          quantity: qty,
          unitPrice: price,
          subtotal: subtotal,
        });
        saleDetails.push(saleDetail);
      }

      // Crear la venta
      const sale = saleRepo.create({
        user,
        total,
        date: date ? new Date(date) : undefined,
      } as Partial<Sale>);

      const savedSale = await saleRepo.save(sale);

      // Asignar la venta a los detalles y guardarlos
      for (const detail of saleDetails) {
        detail.sale = savedSale;
        await saleDetailRepo.save(detail);
      }

      // Retornar la venta con detalles
      return this.mapToSaleResponse(savedSale, user, saleDetails);
    });
  }

  // Get All Sales with details
  async findAll(): Promise<SaleResponseDto[]> {
    const sales = await this.salesRepository.find({
      relations: ['user', 'saleDetails', 'saleDetails.product'],
    });

    return sales.map((sale) =>
      this.mapToSaleResponse(sale, sale.user, sale.saleDetails),
    );
  }

  // Get Sale by ID with details
  async findOne(id: number): Promise<SaleResponseDto> {
    const sale = await this.salesRepository.findOne({
      where: { id },
      relations: ['user', 'saleDetails', 'saleDetails.product'],
    });

    if (!sale) {
      throw new NotFoundException(`Sale with id ${id} not found`);
    }

    return this.mapToSaleResponse(sale, sale.user, sale.saleDetails);
  }

  // Lista de todos los productos vendidos y el nombre del usuario que los vendió
  async findAllProductsSold(): Promise<ProductSoldResponseDto[]> {
    const saleDetails = await this.saleDetailRepository.find({
      relations: ['sale', 'sale.user', 'product'],
    });

    return saleDetails.map((detail) => ({
      productId: detail.product.id,
      productName: detail.product.name,
      quantity: detail.quantity,
      unitPrice: detail.unitPrice,
      subtotal: detail.subtotal,
      saleId: detail.sale.id,
      userId: detail.sale.user.id,
      sellerName: detail.sale.user.name,
      saleDate: detail.sale.date,
    }));
  }

  // Update Sale
  update(id: number, updateSaleDto: UpdateSaleDto) {
    return this.salesRepository.update(id, updateSaleDto as Partial<Sale>);
  }

  // Remove Sale
  remove(id: number) {
    return this.salesRepository.delete(id);
  }

  // Helper method to map entities to response DTOs
  private mapToSaleResponse(
    sale: Sale,
    user: User,
    saleDetails: SaleDetail[],
  ): SaleResponseDto {
    return {
      id: sale.id,
      userId: user.id,
      userName: user.name,
      total: sale.total,
      date: sale.date,
      saleDetails: saleDetails.map((detail) => ({
        id: detail.id,
        productId: detail.product.id,
        productName: detail.product.name,
        quantity: detail.quantity,
        unitPrice: detail.unitPrice,
        subtotal: detail.subtotal,
      })),
    };
  }
}
