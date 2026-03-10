import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from './controllers/brand.controller';
import { BrandService } from '../../infrastructure/persistence/brand/services/brand.service';
import { BrandRepository } from '../../infrastructure/persistence/brand/repositories/brand.repository';
import { BrandTypeOrmEntity } from '../../infrastructure/persistence/brand/entities/brand-typeorm.entity';
import { BRAND_REPOSITORY } from '../../core/brand/repositories/repository.tokens';
import { StockTypeOrmEntity } from '../../infrastructure/persistence/stock/entities/stock-typeorm.entity';
import { StockRepository } from '../../infrastructure/persistence/stock/repositories/stock.repository';
import { STOCK_REPOSITORY } from '../../core/stock/repositories/repository.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([BrandTypeOrmEntity, StockTypeOrmEntity])],
  controllers: [BrandController],
  providers: [
    BrandService,
    BrandRepository,
    {
      provide: BRAND_REPOSITORY,
      useClass: BrandRepository,
    },
    StockRepository,
    {
      provide: STOCK_REPOSITORY,
      useClass: StockRepository,
    },
  ],
  exports: [BrandService],
})
export class BrandModule {}

