import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BrandController } from './controllers/brand.controller';
import { BrandService } from '../../infrastructure/persistence/brand/services/brand.service';
import { BrandRepository } from '../../infrastructure/persistence/brand/repositories/brand.repository';
import { BrandTypeOrmEntity } from '../../infrastructure/persistence/brand/entities/brand-typeorm.entity';
import { BRAND_REPOSITORY } from '../../core/brand/repositories/repository.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([BrandTypeOrmEntity])],
  controllers: [BrandController],
  providers: [
    BrandService,
    BrandRepository,
    {
      provide: BRAND_REPOSITORY,
      useClass: BrandRepository,
    },
  ],
  exports: [BrandService],
})
export class BrandModule {}

