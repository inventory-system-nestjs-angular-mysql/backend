import { Unit } from '../entities/unit.entity';

/**
 * Repository Interface - Domain abstraction for data access
 */
export interface IUnitRepository {
  findAll(): Promise<Unit[]>;
  findOne(id: string): Promise<Unit | null>;
  findByDescription(description: string): Promise<Unit | null>;
  createNewSerialNumber(): Promise<string | null>;
  create(unit: Partial<Unit>): Promise<Unit>;
  update(id: string, updateData: Partial<Unit>): Promise<Unit>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  existsByDescription(description: string): Promise<boolean>;
}

