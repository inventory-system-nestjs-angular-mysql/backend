import { Supplier } from '../entities/supplier.entity';

/**
 * Repository Interface - Domain abstraction for data access
 */
export interface ISupplierRepository {
  findAll(): Promise<Supplier[]>;
  findOne(id: string): Promise<Supplier | null>;
  findByCode(code: string): Promise<Supplier | null>;
  findByDescription(description: string): Promise<Supplier | null>;
  create(supplier: Partial<Supplier>): Promise<Supplier>;
  update(id: string, updateData: Partial<Supplier>): Promise<Supplier>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  existsByCode(code: string): Promise<boolean>;
  existsByDescription(description: string): Promise<boolean>;
  countByCityId(cityId: string): Promise<number>;
}

