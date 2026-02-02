import { Invoice } from '../entities/invoice.entity';

/**
 * Repository Interface - Domain abstraction for data access
 */
export interface IInvoiceRepository {
  findAll(): Promise<Invoice[]>;
  findOne(id: string): Promise<Invoice | null>;
  findByEntityId(entityId: string, special?: string): Promise<Invoice[]>; // special: 'BL' for purchasing, 'JL' for sales
  findByRefNo(refNo: string): Promise<Invoice | null>;
  create(invoice: Partial<Invoice>): Promise<Invoice>;
  update(id: string, updateData: Partial<Invoice>): Promise<Invoice>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
}

