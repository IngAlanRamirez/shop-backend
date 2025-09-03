import { User } from 'src/users/entities/user.entity';
import { SaleDetail } from './sale-detail.entity';
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

@Entity()
export class Sale {
  @PrimaryGeneratedColumn()
  id: number;

  // Relacion con el usuario N:1
  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  // Relación con los detalles de venta 1:N
  @OneToMany(() => SaleDetail, (saleDetail) => saleDetail.sale, {
    cascade: true,
  })
  saleDetails: SaleDetail[];

  @Column('decimal')
  total: number;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  date: Date;
}
