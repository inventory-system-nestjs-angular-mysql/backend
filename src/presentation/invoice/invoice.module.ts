import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvoiceController } from './controllers/invoice.controller';
import { InvoiceService } from '../../infrastructure/persistence/invoice/services/invoice.service';
import { InvoiceRepository } from '../../infrastructure/persistence/invoice/repositories/invoice.repository';
import { InvoiceTypeOrmEntity } from '../../infrastructure/persistence/invoice/entities/invoice-typeorm.entity';
import { INVOICE_REPOSITORY } from '../../core/invoice/repositories/repository.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([InvoiceTypeOrmEntity])],
  controllers: [InvoiceController],
  providers: [
    InvoiceService,
    InvoiceRepository,
    {
      provide: INVOICE_REPOSITORY,
      useClass: InvoiceRepository,
    },
  ],
  exports: [InvoiceService],
})
export class InvoiceModule {}

