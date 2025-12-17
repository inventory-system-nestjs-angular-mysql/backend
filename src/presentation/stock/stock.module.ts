import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockController } from './controllers/stock.controller';
import { StockService } from '../../infrastructure/persistence/stock/services/stock.service';
import { StockRepository } from '../../infrastructure/persistence/stock/repositories/stock.repository';
import { StockDetailRepository } from '../../infrastructure/persistence/stock/repositories/stock-detail.repository';
import { StockTypeOrmEntity } from '../../infrastructure/persistence/stock/entities/stock-typeorm.entity';
import { StockDetailTypeOrmEntity } from '../../infrastructure/persistence/stock/entities/stock-detail-typeorm.entity';
import { STOCK_REPOSITORY, STOCK_DETAIL_REPOSITORY } from '../../core/stock/repositories/repository.tokens';

@Module({
  imports: [
    TypeOrmModule.forFeature([StockTypeOrmEntity, StockDetailTypeOrmEntity]),
  ],
  controllers: [StockController],
  providers: [
    StockService,
    StockRepository,
    StockDetailRepository,
    {
      provide: STOCK_REPOSITORY,
      useClass: StockRepository,
    },
    {
      provide: STOCK_DETAIL_REPOSITORY,
      useClass: StockDetailRepository,
    },
  ],
  exports: [StockService],
})
export class StockModule {}

