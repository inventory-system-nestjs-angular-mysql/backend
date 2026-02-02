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
import { InvoiceService } from '../../../infrastructure/persistence/invoice/services/invoice.service';
import { CreateInvoiceDto } from '../dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../dto/update-invoice.dto';
import { InvoiceResponseDto } from '../dto/invoice-response.dto';

@Controller('invoices')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createInvoiceDto: CreateInvoiceDto,
  ): Promise<InvoiceResponseDto> {
    return this.invoiceService.create(createInvoiceDto);
  }

  @Get()
  async findAll(): Promise<InvoiceResponseDto[]> {
    return this.invoiceService.findAll();
  }

  @Get('customer/:customerId')
  async findByCustomerId(
    @Param('customerId') customerId: string,
  ): Promise<InvoiceResponseDto[]> {
    return this.invoiceService.findByCustomerId(customerId);
  }

  @Get('supplier/:supplierId')
  async findBySupplierId(
    @Param('supplierId') supplierId: string,
  ): Promise<InvoiceResponseDto[]> {
    return this.invoiceService.findBySupplierId(supplierId);
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<InvoiceResponseDto> {
    return this.invoiceService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<InvoiceResponseDto> {
    return this.invoiceService.update(id, updateInvoiceDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.invoiceService.remove(id);
  }

  @Post('supplier/:supplierId/bulk')
  @HttpCode(HttpStatus.CREATED)
  async createSupplierInvoices(
    @Param('supplierId') supplierId: string,
    @Body() body: { invoices: CreateInvoiceDto[] },
  ): Promise<InvoiceResponseDto[]> {
    return this.invoiceService.createBulkForSupplier(supplierId, body.invoices);
  }

  @Post('customer/:customerId/bulk')
  @HttpCode(HttpStatus.CREATED)
  async createCustomerInvoices(
    @Param('customerId') customerId: string,
    @Body() body: { invoices: CreateInvoiceDto[] },
  ): Promise<InvoiceResponseDto[]> {
    return this.invoiceService.createBulkForCustomer(customerId, body.invoices);
  }
}

