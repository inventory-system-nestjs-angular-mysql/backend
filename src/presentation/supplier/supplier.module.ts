import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierController } from './controllers/supplier.controller';
import { SupplierService } from '../../infrastructure/persistence/supplier/services/supplier.service';
import { SupplierRepository } from '../../infrastructure/persistence/supplier/repositories/supplier.repository';
import { EntityTypeOrmEntity } from '../../infrastructure/persistence/entity/entities/entity-typeorm.entity';
import { SUPPLIER_REPOSITORY } from '../../core/supplier/repositories/repository.tokens';
import { InvoiceRepository } from '../../infrastructure/persistence/invoice/repositories/invoice.repository';
import { InvoiceTypeOrmEntity } from '../../infrastructure/persistence/invoice/entities/invoice-typeorm.entity';
import { INVOICE_REPOSITORY } from '../../core/invoice/repositories/repository.tokens';
import { StockTypeOrmEntity } from '../../infrastructure/persistence/stock/entities/stock-typeorm.entity';
import { StockRepository } from '../../infrastructure/persistence/stock/repositories/stock.repository';
import { STOCK_REPOSITORY } from '../../core/stock/repositories/repository.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([EntityTypeOrmEntity, InvoiceTypeOrmEntity, StockTypeOrmEntity])],
  controllers: [SupplierController],
  providers: [
    SupplierService,
    SupplierRepository,
    {
      provide: SUPPLIER_REPOSITORY,
      useClass: SupplierRepository,
    },
    InvoiceRepository,
    {
      provide: INVOICE_REPOSITORY,
      useClass: InvoiceRepository,
    },
    StockRepository,
    {
      provide: STOCK_REPOSITORY,
      useClass: StockRepository,
    },
  ],
  exports: [SupplierService],
})
export class SupplierModule {}

