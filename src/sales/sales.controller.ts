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

  // Crear nueva venta
  @Post()
  create(@Body() createSaleDto: CreateSaleDto): Promise<SaleResponseDto> {
    return this.salesService.create(createSaleDto);
  }

  // Obtener todas las ventas
  @Get()
  findAll(): Promise<SaleResponseDto[]> {
    return this.salesService.findAll();
  }

  // Obtener todos los productos vendidos
  @Get('products-sold')
  findAllProductsSold(): Promise<ProductSoldResponseDto[]> {
    return this.salesService.findAllProductsSold();
  }

  // Obtener venta por ID
  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: number): Promise<SaleResponseDto> {
    return this.salesService.findOne(id);
  }

  // Obtener venta por ID con detalles (alias del anterior)
  @Get(':id/details')
  findOneWithDetails(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<SaleResponseDto> {
    return this.salesService.findOne(id);
  }

  // Actualizar venta
  @Patch(':id')
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateSaleDto: UpdateSaleDto,
  ) {
    return this.salesService.update(id, updateSaleDto);
  }

  // Eliminar venta
  @Delete(':id')
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.salesService.remove(id);
  }
}
