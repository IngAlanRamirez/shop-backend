import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Inventory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  product_id: number;

  @Column()
  quantity: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  updated_at: Date;
}
