import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ unique: true })
  sku: string;

  @Column('decimal', { precision: 12, scale: 2 })
  price: number;

  @Column({ type: 'int', default: 0 })
  stock_quantity: number;

  @Column({ nullable: true })
  type: string;

  @Column({ nullable: true })
  status: string;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;
}
