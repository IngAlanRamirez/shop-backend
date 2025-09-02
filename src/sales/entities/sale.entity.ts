import { Product } from 'src/products/entities/product.entity';
import { User } from 'src/users/entities/user.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
} from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  // Relacion con el usuario N:1
  @ManyToOne(() => User, (user) => user.sales)
  user: User;

  // Relacion con los productos N:M
  @ManyToMany(() => Product, (product) => product.sales)
  @JoinTable()
  products: Product[];

  @Column('decimal')
  total: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
