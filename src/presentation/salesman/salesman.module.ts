import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesmanController } from './controllers/salesman.controller';
import { SalesmanService } from '../../infrastructure/persistence/salesman/services/salesman.service';
import { SalesmanRepository } from '../../infrastructure/persistence/salesman/repositories/salesman.repository';
import { SalesmanTypeOrmEntity } from '../../infrastructure/persistence/salesman/entities/salesman-typeorm.entity';
import { SALESMAN_REPOSITORY } from '../../core/salesman/repositories/repository.tokens';
import { InvoiceTypeOrmEntity } from '../../infrastructure/persistence/invoice/entities/invoice-typeorm.entity';
import { InvoiceRepository } from '../../infrastructure/persistence/invoice/repositories/invoice.repository';
import { INVOICE_REPOSITORY } from '../../core/invoice/repositories/repository.tokens';
import { EntityTypeOrmEntity } from '../../infrastructure/persistence/entity/entities/entity-typeorm.entity';
import { CustomerRepository } from '../../infrastructure/persistence/customer/repositories/customer.repository';
import { CUSTOMER_REPOSITORY } from '../../core/customer/repositories/repository.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([SalesmanTypeOrmEntity, InvoiceTypeOrmEntity, EntityTypeOrmEntity])],
  controllers: [SalesmanController],
  providers: [
    SalesmanService,
    SalesmanRepository,
    {
      provide: SALESMAN_REPOSITORY,
      useClass: SalesmanRepository,
    },
    InvoiceRepository,
    {
      provide: INVOICE_REPOSITORY,
      useClass: InvoiceRepository,
    },
    CustomerRepository,
    {
      provide: CUSTOMER_REPOSITORY,
      useClass: CustomerRepository,
    },
  ],
  exports: [SalesmanService],
})
export class SalesmanModule {}

