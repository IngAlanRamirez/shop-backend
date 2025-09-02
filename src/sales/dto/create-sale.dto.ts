import { IsDateString, IsNotEmpty, IsArray, IsOptional } from 'class-validator';

export class CreateSaleDto {
  @IsArray()
  @IsOptional()
  products?: { productId: number; quantity: number }[];

  // Vendedor que hizo la venta
  @IsNotEmpty()
  userId: number;

  @IsDateString()
  @IsNotEmpty()
  date: string;
}
