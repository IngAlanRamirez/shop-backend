import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseIntPipe,
} from '@nestjs/common';
import { SalesService } from './sales.service';
import { CreateSaleDto } from './dto/create-sale.dto';
import { UpdateSaleDto } from './dto/update-sale.dto';
import { SaleResponseDto } from './dto/sale-response.dto';
import { ProductSoldResponseDto } from './dto/products-sold-response.dto';

@Controller('sales')
export class SalesController {
  constructor(private readonly salesService: SalesService) {}

  @Post()
  create(@Body() createSaleDto: CreateSaleDto): Promise<SaleResponseDto> {
    return this.salesService.create(createSaleDto);
  }

  @Get()
  findAll(): Promise<SaleResponseDto[]> {
    return this.salesService.findAll();
  }

  @Get('products-sold')
  findAllProductsSold(): Promise<ProductSoldResponseDto[]> {
    return this.salesService.findAllProductsSold();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SaleResponseDto> {
    return this.salesService.findOne(id);
  }

  @Get(':id/details')
  findOneWithDetails(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SaleResponseDto> {
    return this.salesService.findOne(id);
  }

  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSaleDto: UpdateSaleDto,
  ) {
    return this.salesService.update(id, updateSaleDto);
  }

  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.salesService.remove(id);
  }
}
