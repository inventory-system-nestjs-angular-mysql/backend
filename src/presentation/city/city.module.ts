import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityController } from './controllers/city.controller';
import { CityService } from '../../infrastructure/persistence/city/services/city.service';
import { CityRepository } from '../../infrastructure/persistence/city/repositories/city.repository';
import { CityTypeOrmEntity } from '../../infrastructure/persistence/city/entities/city-typeorm.entity';
import { CITY_REPOSITORY } from '../../core/city/repositories/repository.tokens';
import { CustomerRepository } from 'src/infrastructure/persistence/customer';
import { SupplierRepository } from 'src/infrastructure/persistence/supplier';
import { CUSTOMER_REPOSITORY } from 'src/core/customer';
import { SUPPLIER_REPOSITORY } from 'src/core/supplier';
import { EntityTypeOrmEntity } from 'src/infrastructure/persistence/entity';

@Module({
  imports: [TypeOrmModule.forFeature([CityTypeOrmEntity, EntityTypeOrmEntity])],
  controllers: [CityController],
  providers: [
    CityService,
    CityRepository,
    {
      provide: CITY_REPOSITORY,
      useClass: CityRepository,
    },
    CustomerRepository,
    {
      provide: CUSTOMER_REPOSITORY,
      useClass: CustomerRepository,
    },
    SupplierRepository,
    {
      provide: SUPPLIER_REPOSITORY,
      useClass: SupplierRepository,
    },
  ],
  exports: [CityService],
})
export class CityModule {}

