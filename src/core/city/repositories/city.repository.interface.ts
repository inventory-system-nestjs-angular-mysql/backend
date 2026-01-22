import { City } from '../entities/city.entity';

/**
 * Repository Interface - Domain abstraction for data access
 */
export interface ICityRepository {
  findAll(): Promise<City[]>;
  findOne(id: string): Promise<City | null>;
  findByDescription(description: string): Promise<City | null>;
  createNewSerialNumber(): Promise<string | null>;
  create(city: Partial<City>): Promise<City>;
  update(id: string, updateData: Partial<City>): Promise<City>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  existsByDescription(description: string): Promise<boolean>;
}

