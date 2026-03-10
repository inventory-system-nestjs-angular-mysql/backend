import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CustomerController } from './controllers/customer.controller';
import { CustomerService } from '../../infrastructure/persistence/customer/services/customer.service';
import { CustomerRepository } from '../../infrastructure/persistence/customer/repositories/customer.repository';
import { EntityTypeOrmEntity } from '../../infrastructure/persistence/entity/entities/entity-typeorm.entity';
import { CUSTOMER_REPOSITORY } from '../../core/customer/repositories/repository.tokens';
import { InvoiceRepository } from '../../infrastructure/persistence/invoice/repositories/invoice.repository';
import { InvoiceTypeOrmEntity } from '../../infrastructure/persistence/invoice/entities/invoice-typeorm.entity';
import { INVOICE_REPOSITORY } from '../../core/invoice/repositories/repository.tokens';
import { StockTypeOrmEntity } from '../../infrastructure/persistence/stock/entities/stock-typeorm.entity';
import { StockRepository } from '../../infrastructure/persistence/stock/repositories/stock.repository';
import { STOCK_REPOSITORY } from '../../core/stock/repositories/repository.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([EntityTypeOrmEntity, InvoiceTypeOrmEntity, StockTypeOrmEntity])],
  controllers: [CustomerController],
  providers: [
    CustomerService,
    CustomerRepository,
    {
      provide: CUSTOMER_REPOSITORY,
      useClass: CustomerRepository,
    },
    InvoiceRepository,
    {
      provide: INVOICE_REPOSITORY,
      useClass: InvoiceRepository,
    },
    StockRepository,
    {
      provide: STOCK_REPOSITORY,
      useClass: StockRepository,
    },
  ],
  exports: [CustomerService],
})
export class CustomerModule {}

