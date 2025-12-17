import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UnitController } from './controllers/unit.controller';
import { UnitService } from '../../infrastructure/persistence/unit/services/unit.service';
import { UnitRepository } from '../../infrastructure/persistence/unit/repositories/unit.repository';
import { UnitTypeOrmEntity } from '../../infrastructure/persistence/unit/entities/unit-typeorm.entity';
import { UNIT_REPOSITORY } from '../../core/unit/repositories/repository.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([UnitTypeOrmEntity])],
  controllers: [UnitController],
  providers: [
    UnitService,
    UnitRepository,
    {
      provide: UNIT_REPOSITORY,
      useClass: UnitRepository,
    },
  ],
  exports: [UnitService],
})
export class UnitModule {}

