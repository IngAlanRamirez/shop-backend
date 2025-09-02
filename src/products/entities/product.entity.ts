import { Sale } from 'src/sales/entities/sale.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('text', { nullable: true })
  description: string;

  @Column('decimal')
  price: number;

  @Column()
  stock_quantity: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @ManyToMany(() => Sale, (sale) => sale.products)
  sales: Sale[];
}
