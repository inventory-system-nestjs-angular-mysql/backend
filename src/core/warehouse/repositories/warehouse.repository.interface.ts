import { Warehouse } from '../entities/warehouse.entity';

/**
 * Repository Interface - Domain abstraction for data access
 */
export interface IWarehouseRepository {
  findAll(): Promise<Warehouse[]>;
  findOne(id: string): Promise<Warehouse | null>;
  findByDescription(description: string): Promise<Warehouse | null>;
  createNewSerialNumber(): Promise<string | null>;
  create(warehouse: Partial<Warehouse>): Promise<Warehouse>;
  update(id: string, updateData: Partial<Warehouse>): Promise<Warehouse>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  existsByDescription(description: string): Promise<boolean>;
}

