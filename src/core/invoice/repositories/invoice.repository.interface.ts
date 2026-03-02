import { Invoice } from '../entities/invoice.entity';

/**
 * Repository Interface - Domain abstraction for data access
 */
export interface IInvoiceRepository {
  findAll(): Promise<Invoice[]>;
  findOne(id: string): Promise<Invoice | null>;
  findByEntityId(entityId: string, special?: string, opening?: number): Promise<Invoice[]>; // special: 'BL' for purchasing, 'JL' for sales; opening: 1 for opening balance only
  findByRefNo(refNo: string): Promise<Invoice | null>;
  create(invoice: Partial<Invoice>): Promise<Invoice>;
  update(id: string, updateData: Partial<Invoice>): Promise<Invoice>;
  delete(id: string): Promise<void>;
  exists(id: string): Promise<boolean>;
  countByExchangeId(exchangeId: string): Promise<number>;
  countByWarehouseId(warehouseId: string): Promise<number>;
  countByEntityId(entityId: string): Promise<number>;
}

