import { StockDetail } from '../entities/stock-detail.entity';

/**
 * Repository Interface - Domain abstraction for data access
 */
export interface IStockDetailRepository {
  findAll(): Promise<StockDetail[]>;
  findByStockId(stockId: string): Promise<StockDetail[]>;
  findOne(id: string): Promise<StockDetail | null>;
  create(stockDetail: Partial<StockDetail>): Promise<StockDetail>;
  createMany(stockDetails: Partial<StockDetail>[]): Promise<StockDetail[]>;
  update(id: string, updateData: Partial<StockDetail>): Promise<StockDetail>;
  delete(id: string): Promise<void>;
  deleteByStockId(stockId: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}

