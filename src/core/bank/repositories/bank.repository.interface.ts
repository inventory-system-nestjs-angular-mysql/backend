import { Bank } from '../entities/bank.entity';

/**
 * Repository Interface - Domain abstraction for data access
 */
export interface IBankRepository {
  findAll(): Promise<Bank[]>;
  findOne(id: string): Promise<Bank | null>;
  findByDescription(description: string): Promise<Bank | null>;
  createNewSerialNumber(): Promise<string | null>;
  create(bank: Partial<Bank>): Promise<Bank>;
  update(id: string, updateData: Partial<Bank>): Promise<Bank>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  existsByDescription(description: string): Promise<boolean>;
}

