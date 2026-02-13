import { Customer } from '../entities/customer.entity';

/**
 * Repository Interface - Domain abstraction for data access
 */
export interface ICustomerRepository {
  findAll(): Promise<Customer[]>;
  findOne(id: string): Promise<Customer | null>;
  findByCode(code: string): Promise<Customer | null>;
  findByDescription(description: string): Promise<Customer | null>;
  create(customer: Partial<Customer>): Promise<Customer>;
  update(id: string, updateData: Partial<Customer>): Promise<Customer>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  existsByCode(code: string): Promise<boolean>;
  existsByDescription(description: string): Promise<boolean>;
  countByCityId(cityId: string): Promise<number>;
}

