import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SupplierController } from './controllers/supplier.controller';
import { SupplierService } from '../../infrastructure/persistence/supplier/services/supplier.service';
import { SupplierRepository } from '../../infrastructure/persistence/supplier/repositories/supplier.repository';
import { EntityTypeOrmEntity } from '../../infrastructure/persistence/entity/entities/entity-typeorm.entity';
import { SUPPLIER_REPOSITORY } from '../../core/supplier/repositories/repository.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([EntityTypeOrmEntity])],
  controllers: [SupplierController],
  providers: [
    SupplierService,
    SupplierRepository,
    {
      provide: SUPPLIER_REPOSITORY,
      useClass: SupplierRepository,
    },
  ],
  exports: [SupplierService],
})
export class SupplierModule {}

