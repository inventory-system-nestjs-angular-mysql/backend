import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockGroupController } from './controllers/stockgroup.controller';
import { StockGroupService } from '../../infrastructure/persistence/stockgroup/services/stockgroup.service';
import { StockGroupRepository } from '../../infrastructure/persistence/stockgroup/repositories/stockgroup.repository';
import { StockGroupTypeOrmEntity } from '../../infrastructure/persistence/stockgroup/entities/stockgroup-typeorm.entity';
import { STOCK_GROUP_REPOSITORY } from '../../core/stockgroup/repositories/repository.tokens';
import { StockRepository } from '../../infrastructure/persistence/stock/repositories/stock.repository';
import { STOCK_REPOSITORY } from '../../core/stock/repositories/repository.tokens';
import { StockTypeOrmEntity } from '../../infrastructure/persistence/stock/entities/stock-typeorm.entity';

@Module({
  imports: [TypeOrmModule.forFeature([StockGroupTypeOrmEntity, StockTypeOrmEntity])],
  controllers: [StockGroupController],
  providers: [
    StockGroupService,
    StockGroupRepository,
    StockRepository,
    {
      provide: STOCK_GROUP_REPOSITORY,
      useClass: StockGroupRepository,
    },
    {
      provide: STOCK_REPOSITORY,
      useClass: StockRepository,
    },
  ],
  exports: [StockGroupService],
})
export class StockGroupModule {}
