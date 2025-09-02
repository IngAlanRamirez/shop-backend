import { IsDate, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateSaleDto {
  // Detalle de la venta, agrega la relación con los productos
  @IsArray()
  @IsOptional()
  ProductsController?: { productId: number; quantity: number }[];

  // Vendedor que hizo la venta
  @IsNotEmpty()
  userId: number;

  @IsDate()
  @IsNotEmpty()
  date: Date;
}
