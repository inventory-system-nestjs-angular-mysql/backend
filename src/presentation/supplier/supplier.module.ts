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

@Module({
  imports: [TypeOrmModule.forFeature([EntityTypeOrmEntity, InvoiceTypeOrmEntity])],
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
  ],
  exports: [SupplierService],
})
export class SupplierModule {}

