import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PurchasingController } from './controllers/purchasing.controller';
import { PurchasingService } from '../../infrastructure/persistence/purchasing/services/purchasing.service';
import { PurchasingRepository } from '../../infrastructure/persistence/purchasing/repositories/purchasing.repository';
import { InvoiceTypeOrmEntity } from '../../infrastructure/persistence/invoice/entities/invoice-typeorm.entity';
import { InvoiceDetailTypeOrmEntity } from '../../infrastructure/persistence/invoice/entities/invoice-detail-typeorm.entity';
import { EntityTypeOrmEntity } from '../../infrastructure/persistence/entity/entities/entity-typeorm.entity';
import { WarehouseTypeOrmEntity } from '../../infrastructure/persistence/warehouse/entities/warehouse-typeorm.entity';
import { CurrencyTypeOrmEntity } from '../../infrastructure/persistence/currency/entities/currency-typeorm.entity';
import { StockTypeOrmEntity } from '../../infrastructure/persistence/stock/entities/stock-typeorm.entity';
import { PURCHASING_REPOSITORY } from '../../core/purchasing/repositories/purchasing.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InvoiceTypeOrmEntity,
      InvoiceDetailTypeOrmEntity,
      EntityTypeOrmEntity,
      WarehouseTypeOrmEntity,
      CurrencyTypeOrmEntity,
      StockTypeOrmEntity,
    ]),
  ],
  controllers: [PurchasingController],
  providers: [
    PurchasingService,
    PurchasingRepository,
    {
      provide: PURCHASING_REPOSITORY,
      useClass: PurchasingRepository,
    },
  ],
  exports: [PurchasingService],
})
export class PurchasingModule {}
