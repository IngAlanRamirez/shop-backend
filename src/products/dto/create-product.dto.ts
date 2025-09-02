import {
  IsString,
  IsNotEmpty,
  IsDecimal,
  IsPositive,
  IsOptional,
} from 'class-validator';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsDecimal()
  @IsPositive()
  price: number;

  @IsPositive()
  stock_quantity: number;
}
