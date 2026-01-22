import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { WarehouseController } from './controllers/warehouse.controller';
import { WarehouseService } from '../../infrastructure/persistence/warehouse/services/warehouse.service';
import { WarehouseRepository } from '../../infrastructure/persistence/warehouse/repositories/warehouse.repository';
import { WarehouseTypeOrmEntity } from '../../infrastructure/persistence/warehouse/entities/warehouse-typeorm.entity';
import { WAREHOUSE_REPOSITORY } from '../../core/warehouse/repositories/repository.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([WarehouseTypeOrmEntity])],
  controllers: [WarehouseController],
  providers: [
    WarehouseService,
    WarehouseRepository,
    {
      provide: WAREHOUSE_REPOSITORY,
      useClass: WarehouseRepository,
    },
  ],
  exports: [WarehouseService],
})
export class WarehouseModule {}

