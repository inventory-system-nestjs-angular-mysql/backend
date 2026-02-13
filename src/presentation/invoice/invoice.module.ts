import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceService } from '../../infrastructure/persistence/invoice/services/invoice.service';
import { InvoiceRepository } from '../../infrastructure/persistence/invoice/repositories/invoice.repository';
import { InvoiceDetailRepository } from '../../infrastructure/persistence/invoice/repositories/invoice-detail.repository';
import { InvoiceTypeOrmEntity } from '../../infrastructure/persistence/invoice/entities/invoice-typeorm.entity';
import { InvoiceDetailTypeOrmEntity } from '../../infrastructure/persistence/invoice/entities/invoice-detail-typeorm.entity';
import { StockDetailTypeOrmEntity } from '../../infrastructure/persistence/stock/entities/stock-detail-typeorm.entity';
import { StockDetailRepository } from '../../infrastructure/persistence/stock/repositories/stock-detail.repository';
import { INVOICE_REPOSITORY, INVOICE_DETAIL_REPOSITORY } from '../../core/invoice/repositories/repository.tokens';
import { STOCK_DETAIL_REPOSITORY } from '../../core/stock/repositories/repository.tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InvoiceTypeOrmEntity,
      InvoiceDetailTypeOrmEntity,
      StockDetailTypeOrmEntity,
    ]),
  ],
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
    InvoiceRepository,
    InvoiceDetailRepository,
    StockDetailRepository,
    {
      provide: INVOICE_REPOSITORY,
      useClass: InvoiceRepository,
    },
    {
      provide: INVOICE_DETAIL_REPOSITORY,
      useClass: InvoiceDetailRepository,
    },
    {
      provide: STOCK_DETAIL_REPOSITORY,
      useClass: StockDetailRepository,
    },
  ],
  exports: [InvoiceService],
})
export class InvoiceModule {}

