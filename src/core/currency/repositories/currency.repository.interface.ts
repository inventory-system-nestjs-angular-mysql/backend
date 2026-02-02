import { Currency } from '../entities/currency.entity';

/**
 * Repository Interface - Domain abstraction for data access
 */
export interface ICurrencyRepository {
  findAll(): Promise<Currency[]>;
  findOne(id: string): Promise<Currency | null>;
  findByCurrency(currency: string): Promise<Currency | null>;
  createNewSerialNumber(): Promise<string | null>;
  create(currency: Partial<Currency>): Promise<Currency>;
  update(id: string, updateData: Partial<Currency>): Promise<Currency>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  existsByCurrency(currency: string): Promise<boolean>;
}

