import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CurrencyController } from './controllers/currency.controller';
import { CurrencyService } from '../../infrastructure/persistence/currency/services/currency.service';
import { CurrencyRepository } from '../../infrastructure/persistence/currency/repositories/currency.repository';
import { CurrencyTypeOrmEntity } from '../../infrastructure/persistence/currency/entities/currency-typeorm.entity';
import { CURRENCY_REPOSITORY } from '../../core/currency/repositories/repository.tokens';
import { InvoiceRepository } from '../../infrastructure/persistence/invoice/repositories/invoice.repository';
import { InvoiceTypeOrmEntity } from '../../infrastructure/persistence/invoice/entities/invoice-typeorm.entity';
import { INVOICE_REPOSITORY } from '../../core/invoice/repositories/repository.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([CurrencyTypeOrmEntity, InvoiceTypeOrmEntity])],
  controllers: [CurrencyController],
  providers: [
    CurrencyService,
    CurrencyRepository,
    {
      provide: CURRENCY_REPOSITORY,
      useClass: CurrencyRepository,
    },
    InvoiceRepository,
    {
      provide: INVOICE_REPOSITORY,
      useClass: InvoiceRepository,
    },
  ],
  exports: [CurrencyService],
})
export class CurrencyModule {}

