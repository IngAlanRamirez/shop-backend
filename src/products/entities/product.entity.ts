import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

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
}
