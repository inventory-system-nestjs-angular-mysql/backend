import { Controller, Get, Post, Patch, Delete, Param, Body, Query } from '@nestjs/common';
import { SupplierPaymentService } from '../../../infrastructure/persistence/supplier-payment/services/supplier-payment.service';
import { CreateSupplierPaymentDto } from '../dto/create-supplier-payment.dto';

@Controller('supplier-payment')
export class SupplierPaymentController {
  constructor(private readonly service: SupplierPaymentService) {}

  @Get('next-invoice-no')
  getNextInvoiceNo() {
    return this.service.getNextInvoiceNo();
  }

  @Get('outstanding-invoices')
  getOutstandingInvoices(
    @Query('supplierId') supplierId: string,
    @Query('currencyId') currencyId: string,
  ) {
    return this.service.findOutstandingInvoices(supplierId, currencyId);
  }

  @Get('search-by-invoice')
  searchByInvoice(@Query('invoiceNo') invoiceNo: string) {
    return this.service.searchByInvoiceNo(invoiceNo);
  }

  @Get('search-supplier')
  searchSupplier(@Query('name') name: string) {
    return this.service.searchSupplierByName(name);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Post()
  create(@Body() dto: CreateSupplierPaymentDto) {
    return this.service.create(dto);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateSupplierPaymentDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
