import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalesmanController } from './controllers/salesman.controller';
import { SalesmanService } from '../../infrastructure/persistence/salesman/services/salesman.service';
import { SalesmanRepository } from '../../infrastructure/persistence/salesman/repositories/salesman.repository';
import { SalesmanTypeOrmEntity } from '../../infrastructure/persistence/salesman/entities/salesman-typeorm.entity';
import { SALESMAN_REPOSITORY } from '../../core/salesman/repositories/repository.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([SalesmanTypeOrmEntity])],
  controllers: [SalesmanController],
  providers: [
    SalesmanService,
    SalesmanRepository,
    {
      provide: SALESMAN_REPOSITORY,
      useClass: SalesmanRepository,
    },
  ],
  exports: [SalesmanService],
})
export class SalesmanModule {}

