import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BankController } from './controllers/bank.controller';
import { BankService } from '../../infrastructure/persistence/bank/services/bank.service';
import { BankRepository } from '../../infrastructure/persistence/bank/repositories/bank.repository';
import { BankTypeOrmEntity } from '../../infrastructure/persistence/bank/entities/bank-typeorm.entity';
import { BANK_REPOSITORY } from '../../core/bank/repositories/repository.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([BankTypeOrmEntity])],
  controllers: [BankController],
  providers: [
    BankService,
    BankRepository,
    {
      provide: BANK_REPOSITORY,
      useClass: BankRepository,
    },
  ],
  exports: [BankService],
})
export class BankModule {}

