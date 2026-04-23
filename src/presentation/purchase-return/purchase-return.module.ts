import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchaseReturnController } from './controllers/purchase-return.controller';
import { PurchaseReturnService } from '../../infrastructure/persistence/purchase-return/services/purchase-return.service';
import { PurchaseReturnRepository } from '../../infrastructure/persistence/purchase-return/repositories/purchase-return.repository';
import { InvoiceTypeOrmEntity } from '../../infrastructure/persistence/invoice/entities/invoice-typeorm.entity';
import { InvoiceDetailTypeOrmEntity } from '../../infrastructure/persistence/invoice/entities/invoice-detail-typeorm.entity';
import { EntityTypeOrmEntity } from '../../infrastructure/persistence/entity/entities/entity-typeorm.entity';
import { WarehouseTypeOrmEntity } from '../../infrastructure/persistence/warehouse/entities/warehouse-typeorm.entity';
import { CurrencyTypeOrmEntity } from '../../infrastructure/persistence/currency/entities/currency-typeorm.entity';
import { StockTypeOrmEntity } from '../../infrastructure/persistence/stock/entities/stock-typeorm.entity';
import { PayheaderTypeOrmEntity } from '../../infrastructure/persistence/payment/entities/payheader-typeorm.entity';
import { PaydetailTypeOrmEntity } from '../../infrastructure/persistence/payment/entities/paydetail-typeorm.entity';
import { PURCHASE_RETURN_REPOSITORY } from '../../core/purchase-return/repositories/purchase-return.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InvoiceTypeOrmEntity,
      InvoiceDetailTypeOrmEntity,
      EntityTypeOrmEntity,
      WarehouseTypeOrmEntity,
      CurrencyTypeOrmEntity,
      StockTypeOrmEntity,
      PayheaderTypeOrmEntity,
      PaydetailTypeOrmEntity,
    ]),
  ],
  controllers: [PurchaseReturnController],
  providers: [
    PurchaseReturnService,
    PurchaseReturnRepository,
    {
      provide: PURCHASE_RETURN_REPOSITORY,
      useClass: PurchaseReturnRepository,
    },
  ],
  exports: [PurchaseReturnService],
})
export class PurchaseReturnModule {}
