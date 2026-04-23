import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
} from '@nestjs/common';
import { PurchaseReturnService } from '../../../infrastructure/persistence/purchase-return/services/purchase-return.service';
import { CreatePurchaseReturnDto } from '../dto/create-purchase-return.dto';
import { PurchaseReturnResponseDto, OutstandingInvoiceResponseDto } from '../dto/purchase-return-response.dto';

@Controller('purchase-return')
export class PurchaseReturnController {
  constructor(private readonly purchaseReturnService: PurchaseReturnService) {}

  @Get('outstanding-invoices')
  findOutstandingInvoices(
    @Query('supplierId') supplierId: string,
    @Query('currencyId') currencyId: string,
  ): Promise<OutstandingInvoiceResponseDto[]> {
    return this.purchaseReturnService.findOutstandingInvoices(supplierId, currencyId);
  }

  @Get()
  findAll(): Promise<PurchaseReturnResponseDto[]> {
    return this.purchaseReturnService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string): Promise<PurchaseReturnResponseDto> {
    return this.purchaseReturnService.findOne(id);
  }

  @Post()
  create(@Body() dto: CreatePurchaseReturnDto): Promise<PurchaseReturnResponseDto> {
    return this.purchaseReturnService.create(dto);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() dto: CreatePurchaseReturnDto,
  ): Promise<PurchaseReturnResponseDto> {
    return this.purchaseReturnService.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string): Promise<void> {
    return this.purchaseReturnService.remove(id);
  }
}
