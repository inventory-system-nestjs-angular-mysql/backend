import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './infrastructure/config/database.config';
import { StockGroupModule } from './presentation/stockgroup/stockgroup.module';
import { StockModule } from './presentation/stock/stock.module';
import { UnitModule } from './presentation/unit/unit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [databaseConfig],
      envFilePath: ['.env.local', '.env'],
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        ...configService.get('database'),
      }),
      inject: [ConfigService],
    }),
    StockGroupModule,
    StockModule,
    UnitModule,
  ],
})
export class AppModule {}

