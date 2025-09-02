import { IsArray, IsOptional } from 'class-validator';

export class UpdateSaleDto {
  @IsArray()
  @IsOptional()
  items?: { productId: number; quantity: number }[];
}
