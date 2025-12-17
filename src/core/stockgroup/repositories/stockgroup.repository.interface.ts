import { StockGroup } from '../entities/stockgroup.entity';

/**
 * Repository Interface - Domain abstraction for data access
 */
export interface IStockGroupRepository {
  findAll(): Promise<StockGroup[]>;
  findOne(id: string): Promise<StockGroup | null>;
  findByDescription(description: string): Promise<StockGroup | null>;
  createNewSerialNumber(): Promise<string | null>;
  create(stockGroup: Partial<StockGroup>): Promise<StockGroup>;
  update(id: string, updateData: Partial<StockGroup>): Promise<StockGroup>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  existsByDescription(description: string): Promise<boolean>;
}

