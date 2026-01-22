import { Salesman } from '../entities/salesman.entity';

/**
 * Repository Interface - Domain abstraction for data access
 */
export interface ISalesmanRepository {
  findAll(): Promise<Salesman[]>;
  findOne(id: string): Promise<Salesman | null>;
  findByDescription(description: string): Promise<Salesman | null>;
  create(salesman: Partial<Salesman>): Promise<Salesman>;
  update(id: string, updateData: Partial<Salesman>): Promise<Salesman>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  existsByDescription(description: string): Promise<boolean>;
}

