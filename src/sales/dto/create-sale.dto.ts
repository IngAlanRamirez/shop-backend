import { IsDateString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateSaleDto {
  @IsArray()
  @IsNotEmpty()
  products: { productId: number; quantity: number }[];

  // Vendedor que hizo la venta
  @IsNotEmpty()
  userId: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;
}
