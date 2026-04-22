import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PurchasingService } from '../../../infrastructure/persistence/purchasing/services/purchasing.service';
import { CreatePurchasingDto } from '../dto/create-purchasing.dto';
import { PurchasingResponseDto } from '../dto/purchasing-response.dto';

@Controller('purchasing')
export class PurchasingController {
  constructor(private readonly purchasingService: PurchasingService) {}

  @Get()
  findAll(): Promise<PurchasingResponseDto[]> {
    return this.purchasingService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PurchasingResponseDto> {
    return this.purchasingService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePurchasingDto): Promise<PurchasingResponseDto> {
    return this.purchasingService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: CreatePurchasingDto,
  ): Promise<PurchasingResponseDto> {
    return this.purchasingService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.purchasingService.remove(id);
  }
}
