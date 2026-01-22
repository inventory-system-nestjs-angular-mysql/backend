import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CityController } from './controllers/city.controller';
import { CityService } from '../../infrastructure/persistence/city/services/city.service';
import { CityRepository } from '../../infrastructure/persistence/city/repositories/city.repository';
import { CityTypeOrmEntity } from '../../infrastructure/persistence/city/entities/city-typeorm.entity';
import { CITY_REPOSITORY } from '../../core/city/repositories/repository.tokens';

@Module({
  imports: [TypeOrmModule.forFeature([CityTypeOrmEntity])],
  controllers: [CityController],
  providers: [
    CityService,
    CityRepository,
    {
      provide: CITY_REPOSITORY,
      useClass: CityRepository,
    },
  ],
  exports: [CityService],
})
export class CityModule {}

