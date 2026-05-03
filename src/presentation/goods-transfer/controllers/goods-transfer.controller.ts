import { Controller, Get, Post, Patch, Delete, Param, Body } from '@nestjs/common';
import { GoodsTransferService } from '../../../infrastructure/persistence/goods-transfer/services/goods-transfer.service';
import { CreateGoodsTransferDto } from '../dto/create-goods-transfer.dto';
import { GoodsTransferResponseDto } from '../dto/goods-transfer-response.dto';

@Controller('goods-transfer')
export class GoodsTransferController {
  constructor(private readonly goodsTransferService: GoodsTransferService) {}

  @Get()
  findAll(): Promise<GoodsTransferResponseDto[]> {
    return this.goodsTransferService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<GoodsTransferResponseDto> {
    return this.goodsTransferService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateGoodsTransferDto): Promise<GoodsTransferResponseDto> {
    return this.goodsTransferService.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateGoodsTransferDto): Promise<GoodsTransferResponseDto> {
    return this.goodsTransferService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.goodsTransferService.remove(id);
  }
}
