import {
  IsString,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @Type(() => Number)
  @IsNumber()
  price: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  stock_quantity?: number;

  @IsOptional()
  @IsString()
  stock?: string;

  @IsOptional()
  @IsString()
  type?: string;

  @IsOptional()
  @IsString()
  @IsIn(['Active', 'Inactive', 'On Sale', 'Bouncing', 'Pending'])
  status?: string;
}
