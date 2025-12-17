import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { StockGroupTypeOrmEntity } from '../persistence/stockgroup/entities/stockgroup-typeorm.entity';
import { StockDetailTypeOrmEntity, StockTypeOrmEntity } from '../persistence/stock';
import { UnitTypeOrmEntity } from '../persistence/unit';

export default registerAs(
  'database',
  (): TypeOrmModuleOptions => ({
    type: 'mysql',
    host: process.env.DB_HOST || 'localhost',
    port: parseInt(process.env.DB_PORT, 10) || 3306,
    username: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_DATABASE || 'eisdata',
    entities: [StockGroupTypeOrmEntity, StockTypeOrmEntity, StockDetailTypeOrmEntity, UnitTypeOrmEntity],
    synchronize: process.env.NODE_ENV !== 'production',
    logging: process.env.NODE_ENV === 'development',
    charset: 'utf8mb4',
    timezone: '+00:00',
  }),
);