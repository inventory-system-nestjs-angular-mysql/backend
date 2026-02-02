import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { StockGroupTypeOrmEntity } from '../persistence/stockgroup/entities/stockgroup-typeorm.entity';
import { StockDetailTypeOrmEntity, StockTypeOrmEntity } from '../persistence/stock';
import { UnitTypeOrmEntity } from '../persistence/unit';
import { BankTypeOrmEntity } from '../persistence/bank';
import { WarehouseTypeOrmEntity } from '../persistence/warehouse';
import { CityTypeOrmEntity } from '../persistence/city';
import { BrandTypeOrmEntity } from '../persistence/brand';
import { EntityTypeOrmEntity } from '../persistence/entity/entities/entity-typeorm.entity';
import { SalesmanTypeOrmEntity } from '../persistence/salesman/entities/salesman-typeorm.entity';
import { InvoiceTypeOrmEntity } from '../persistence/invoice/entities/invoice-typeorm.entity';
import { CurrencyTypeOrmEntity } from '../persistence/currency/entities/currency-typeorm.entity';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'eisdata',
    entities: [StockGroupTypeOrmEntity, StockTypeOrmEntity, StockDetailTypeOrmEntity, UnitTypeOrmEntity,BankTypeOrmEntity, WarehouseTypeOrmEntity, CityTypeOrmEntity, BrandTypeOrmEntity, EntityTypeOrmEntity, SalesmanTypeOrmEntity, InvoiceTypeOrmEntity, CurrencyTypeOrmEntity],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
    charset: 'utf8mb4',
    timezone: '+00:00',
  }),
);