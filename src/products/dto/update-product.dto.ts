import { IsString, IsOptional, IsDecimal, IsPositive } from 'class-validator';

export class UpdateProductDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDecimal()
  @IsOptional()
  @IsPositive()
  price?: number;

  @IsPositive()
  @IsOptional()
  stock_quantity?: number;
}
