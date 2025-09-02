import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @Column('decimal')
  total: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
