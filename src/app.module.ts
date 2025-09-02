import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { ProductsModule } from './products/products.module';
import { SalesModule } from './sales/sales.module';
import { InventoryModule } from './inventory/inventory.module';
import { AuthModule } from './auth/auth.module';
import { User } from './users/entities/user.entity';
import { Product } from './products/entities/product.entity';
import { Sale } from './sales/entities/sale.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost', // O la dirección IP de tu servidor de base de datos
      port: 5432,
      // username: 'admin', // Usa el nuevo nombre de usuario aquí
      // password: 'Xbqb719>qW', // Usa la contraseña que has configurado
      database: 'postgres', // Asegúrate de que este sea el nombre correcto de tu base de datos
      entities: [User, Product, Sale],
      synchronize: true,
    }),
    UsersModule,
    ProductsModule,
    SalesModule,
    InventoryModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
