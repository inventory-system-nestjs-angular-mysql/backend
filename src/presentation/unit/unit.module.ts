import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitController } from './controllers/unit.controller';
import { UnitService } from '../../infrastructure/persistence/unit/services/unit.service';
import { UnitRepository } from '../../infrastructure/persistence/unit/repositories/unit.repository';
import { UnitTypeOrmEntity } from '../../infrastructure/persistence/unit/entities/unit-typeorm.entity';
import { UNIT_REPOSITORY } from '../../core/unit/repositories/repository.tokens';
import { StockDetailRepository } from '../../infrastructure/persistence/stock/repositories/stock-detail.repository';
import { StockDetailTypeOrmEntity } from '../../infrastructure/persistence/stock/entities/stock-detail-typeorm.entity';
import { STOCK_DETAIL_REPOSITORY } from '../../core/stock/repositories/repository.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([UnitTypeOrmEntity, StockDetailTypeOrmEntity])],
  controllers: [UnitController],
  providers: [
    UnitService,
    UnitRepository,
    {
      provide: UNIT_REPOSITORY,
      useClass: UnitRepository,
    },
    StockDetailRepository,
    {
      provide: STOCK_DETAIL_REPOSITORY,
      useClass: StockDetailRepository,
    },
  ],
  exports: [UnitService],
})
export class UnitModule {}

