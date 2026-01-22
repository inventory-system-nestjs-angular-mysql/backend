import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import databaseConfig from './infrastructure/config/database.config';
import { StockGroupModule } from './presentation/stockgroup/stockgroup.module';
import { StockModule } from './presentation/stock/stock.module';
import { UnitModule } from './presentation/unit/unit.module';
import { BankModule } from './presentation/bank/bank.module';
import { WarehouseModule } from './presentation/warehouse/warehouse.module';
import { BrandModule } from './presentation/brand/brand.module';
import { CityModule } from './presentation/city/city.module';
import { SupplierModule } from './presentation/supplier/supplier.module';
import { CustomerModule } from './presentation/customer/customer.module';
import { SalesmanModule } from './presentation/salesman/salesman.module';

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
    BankModule,
    WarehouseModule,
    BrandModule,
    CityModule,
    SupplierModule,
    CustomerModule,
    SalesmanModule,
  ],
})
export class AppModule {}

