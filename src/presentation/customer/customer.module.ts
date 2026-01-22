import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from '../../infrastructure/persistence/customer/services/customer.service';
import { CustomerRepository } from '../../infrastructure/persistence/customer/repositories/customer.repository';
import { EntityTypeOrmEntity } from '../../infrastructure/persistence/entity/entities/entity-typeorm.entity';
import { CUSTOMER_REPOSITORY } from '../../core/customer/repositories/repository.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([EntityTypeOrmEntity])],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    CustomerRepository,
    {
      provide: CUSTOMER_REPOSITORY,
      useClass: CustomerRepository,
    },
  ],
  exports: [CustomerService],
})
export class CustomerModule {}

