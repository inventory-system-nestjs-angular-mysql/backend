import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { StockService } from '../../../infrastructure/persistence/stock/services/stock.service';
import { CreateStockDto } from '../dto/create-stock.dto';
import { UpdateStockDto } from '../dto/update-stock.dto';
import { StockResponseDto } from '../dto/stock-response.dto';
import { CreateStockDetailDto } from '../dto/create-stock-detail.dto';
import { UpdateStockDetailDto } from '../dto/update-stock-detail.dto';
import { StockDetailResponseDto } from '../dto/stock-detail-response.dto';
import { StockDetailLookupItemDto } from '../dto/stock-detail-lookup-item.dto';

@Controller('stocks')
export class StockController {
  constructor(private readonly stockService: StockService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createStockDto: CreateStockDto,
  ): Promise<StockResponseDto> {
    return this.stockService.create(createStockDto);
  }

  @Get()
  async findAll(): Promise<StockResponseDto[]> {
    return this.stockService.findAll();
  }

  @Get('all-details')
  async findAllStockDetailsForLookup(): Promise<StockDetailLookupItemDto[]> {
    return this.stockService.findAllStockDetailsForLookup();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StockResponseDto> {
    return this.stockService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStockDto: UpdateStockDto,
  ): Promise<StockResponseDto> {
    return this.stockService.update(id, updateStockDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.stockService.remove(id);
  }

  // StockDetail endpoints
  @Post(':stockId/details')
  @HttpCode(HttpStatus.CREATED)
  async createStockDetail(
    @Param('stockId') stockId: string,
    @Body() createStockDetailDto: CreateStockDetailDto,
  ): Promise<StockDetailResponseDto> {
    return this.stockService.createStockDetail(stockId, createStockDetailDto);
  }

  @Get(':stockId/details')
  async findStockDetails(
    @Param('stockId') stockId: string,
  ): Promise<StockDetailResponseDto[]> {
    return this.stockService.findStockDetails(stockId);
  }

  @Get('details/:id')
  async findStockDetail(@Param('id') id: string): Promise<StockDetailResponseDto> {
    return this.stockService.findStockDetail(id);
  }

  @Patch('details/:id')
  async updateStockDetail(
    @Param('id') id: string,
    @Body() updateStockDetailDto: UpdateStockDetailDto,
  ): Promise<StockDetailResponseDto> {
    return this.stockService.updateStockDetail(id, updateStockDetailDto);
  }

  @Delete('details/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async removeStockDetail(@Param('id') id: string): Promise<void> {
    return this.stockService.removeStockDetail(id);
  }
}

