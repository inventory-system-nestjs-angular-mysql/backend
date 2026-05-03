import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { GoodsTransferController } from './controllers/goods-transfer.controller';
import { GoodsTransferService } from '../../infrastructure/persistence/goods-transfer/services/goods-transfer.service';
import { GoodsTransferRepository } from '../../infrastructure/persistence/goods-transfer/repositories/goods-transfer.repository';
import { InvoiceTypeOrmEntity } from '../../infrastructure/persistence/invoice/entities/invoice-typeorm.entity';
import { InvoiceDetailTypeOrmEntity } from '../../infrastructure/persistence/invoice/entities/invoice-detail-typeorm.entity';
import { WarehouseTypeOrmEntity } from '../../infrastructure/persistence/warehouse/entities/warehouse-typeorm.entity';
import { CurrencyTypeOrmEntity } from '../../infrastructure/persistence/currency/entities/currency-typeorm.entity';
import { StockTypeOrmEntity } from '../../infrastructure/persistence/stock/entities/stock-typeorm.entity';
import { GOODS_TRANSFER_REPOSITORY } from '../../core/goods-transfer/repositories/goods-transfer.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      InvoiceTypeOrmEntity,
      InvoiceDetailTypeOrmEntity,
      WarehouseTypeOrmEntity,
      CurrencyTypeOrmEntity,
      StockTypeOrmEntity,
    ]),
  ],
  controllers: [GoodsTransferController],
  providers: [
    GoodsTransferService,
    GoodsTransferRepository,
    {
      provide: GOODS_TRANSFER_REPOSITORY,
      useClass: GoodsTransferRepository,
    },
  ],
  exports: [GoodsTransferService],
})
export class GoodsTransferModule {}
