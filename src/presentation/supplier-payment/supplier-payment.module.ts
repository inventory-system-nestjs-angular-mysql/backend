import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PayheaderTypeOrmEntity } from '../../infrastructure/persistence/payment/entities/payheader-typeorm.entity';
import { PaydetailTypeOrmEntity } from '../../infrastructure/persistence/payment/entities/paydetail-typeorm.entity';
import { YmkTypeOrmEntity } from '../../infrastructure/persistence/ymk/entities/ymk-typeorm.entity';
import { EntityTypeOrmEntity } from '../../infrastructure/persistence/entity/entities/entity-typeorm.entity';
import { CurrencyTypeOrmEntity } from '../../infrastructure/persistence/currency/entities/currency-typeorm.entity';
import { WarehouseTypeOrmEntity } from '../../infrastructure/persistence/warehouse/entities/warehouse-typeorm.entity';
import { BankTypeOrmEntity } from '../../infrastructure/persistence/bank/entities/bank-typeorm.entity';
import { SupplierPaymentRepository } from '../../infrastructure/persistence/supplier-payment/repositories/supplier-payment.repository';
import { SupplierPaymentService } from '../../infrastructure/persistence/supplier-payment/services/supplier-payment.service';
import { SupplierPaymentController } from './controllers/supplier-payment.controller';
import { SUPPLIER_PAYMENT_REPOSITORY } from '../../core/supplier-payment/repositories/supplier-payment.repository.interface';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      PayheaderTypeOrmEntity,
      PaydetailTypeOrmEntity,
      YmkTypeOrmEntity,
      EntityTypeOrmEntity,
      CurrencyTypeOrmEntity,
      WarehouseTypeOrmEntity,
      BankTypeOrmEntity,
    ]),
  ],
  controllers: [SupplierPaymentController],
  providers: [
    {
      provide: SUPPLIER_PAYMENT_REPOSITORY,
      useClass: SupplierPaymentRepository,
    },
    SupplierPaymentService,
  ],
})
export class SupplierPaymentModule {}
