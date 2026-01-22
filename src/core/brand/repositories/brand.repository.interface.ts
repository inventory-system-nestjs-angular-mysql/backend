import { Brand } from '../entities/brand.entity';

/**
 * Repository Interface - Domain abstraction for data access
 */
export interface IBrandRepository {
  findAll(): Promise<Brand[]>;
  findOne(id: string): Promise<Brand | null>;
  findByDescription(description: string): Promise<Brand | null>;
  createNewSerialNumber(): Promise<string | null>;
  create(brand: Partial<Brand>): Promise<Brand>;
  update(id: string, updateData: Partial<Brand>): Promise<Brand>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  existsByDescription(description: string): Promise<boolean>;
}

