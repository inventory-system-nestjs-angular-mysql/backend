import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StockGroupController } from './controllers/stockgroup.controller';
import { StockGroupService } from '../../infrastructure/persistence/stockgroup/services/stockgroup.service';
import { StockGroupRepository } from '../../infrastructure/persistence/stockgroup/repositories/stockgroup.repository';
import { StockGroupTypeOrmEntity } from '../../infrastructure/persistence/stockgroup/entities/stockgroup-typeorm.entity';
import { STOCK_GROUP_REPOSITORY } from '../../core/stockgroup/repositories/repository.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([StockGroupTypeOrmEntity])],
  controllers: [StockGroupController],
  providers: [
    StockGroupService,
    StockGroupRepository,
    {
      provide: STOCK_GROUP_REPOSITORY,
      useClass: StockGroupRepository,
    },
  ],
  exports: [StockGroupService],
})
export class StockGroupModule {}
