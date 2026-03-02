import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseController } from './controllers/warehouse.controller';
import { WarehouseService } from '../../infrastructure/persistence/warehouse/services/warehouse.service';
import { WarehouseRepository } from '../../infrastructure/persistence/warehouse/repositories/warehouse.repository';
import { WarehouseTypeOrmEntity } from '../../infrastructure/persistence/warehouse/entities/warehouse-typeorm.entity';
import { WAREHOUSE_REPOSITORY } from '../../core/warehouse/repositories/repository.tokens';
import { InvoiceRepository } from '../../infrastructure/persistence/invoice/repositories/invoice.repository';
import { InvoiceTypeOrmEntity } from '../../infrastructure/persistence/invoice/entities/invoice-typeorm.entity';
import { INVOICE_REPOSITORY } from '../../core/invoice/repositories/repository.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([WarehouseTypeOrmEntity, InvoiceTypeOrmEntity])],
  controllers: [WarehouseController],
  providers: [
    WarehouseService,
    WarehouseRepository,
    {
      provide: WAREHOUSE_REPOSITORY,
      useClass: WarehouseRepository,
    },
    InvoiceRepository,
    {
      provide: INVOICE_REPOSITORY,
      useClass: InvoiceRepository,
    },
  ],
  exports: [WarehouseService],
})
export class WarehouseModule {}

