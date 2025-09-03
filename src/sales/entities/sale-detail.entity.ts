import { Product } from 'src/products/entities/product.entity';
import { Sale } from './sale.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class SaleDetail {
  @PrimaryGeneratedColumn()
  id: number;

  // Relación con la venta N:1
  @ManyToOne(() => Sale, (sale) => sale.saleDetails, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'sale_id' })
  sale: Sale;

  // Relación con el producto N:1
  @ManyToOne(() => Product, { onDelete: 'RESTRICT' })
  @JoinColumn({ name: 'product_id' })
  product: Product;

  // Cantidad vendida
  @Column('int')
  quantity: number;

  // Precio unitario al momento de la venta (para mantener histórico)
  @Column('decimal', { precision: 12, scale: 2 })
  unitPrice: number;

  // Subtotal de este producto en la venta
  @Column('decimal', { precision: 12, scale: 2 })
  subtotal: number;
}
