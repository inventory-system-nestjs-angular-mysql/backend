import { Stock } from '../entities/stock.entity';

/**
 * Repository Interface - Domain abstraction for data access
 */
export interface IStockRepository {
  findAll(): Promise<Stock[]>;
  findOne(id: string): Promise<Stock | null>;
  findByDescription(description: string): Promise<Stock | null>;
  create(stock: Partial<Stock>): Promise<Stock>;
  update(id: string, updateData: Partial<Stock>): Promise<Stock>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  existsByDescription(description: string): Promise<boolean>;
  countByStockGroupId(stockGroupId: string): Promise<number>;
}

