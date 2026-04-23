import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { InvoiceTypeOrmEntity } from '../../invoice/entities/invoice-typeorm.entity';
import { InvoiceDetailTypeOrmEntity } from '../../invoice/entities/invoice-detail-typeorm.entity';
import { PayheaderTypeOrmEntity } from '../../payment/entities/payheader-typeorm.entity';
import { PaydetailTypeOrmEntity } from '../../payment/entities/paydetail-typeorm.entity';
import { Invoice } from '../../../../core/invoice/entities/invoice.entity';
import { InvoiceDetail } from '../../../../core/invoice/entities/invoice-detail.entity';
import { IPurchaseReturnRepository, OutstandingInvoiceItem } from '../../../../core/purchase-return/repositories/purchase-return.repository.interface';

const SPECIAL = 'RL';

@Injectable()
export class PurchaseReturnRepository implements IPurchaseReturnRepository {
  constructor(
    @InjectRepository(InvoiceTypeOrmEntity)
    private readonly invoiceRepo: Repository<InvoiceTypeOrmEntity>,
    @InjectRepository(InvoiceDetailTypeOrmEntity)
    private readonly detailRepo: Repository<InvoiceDetailTypeOrmEntity>,
    @InjectRepository(PayheaderTypeOrmEntity)
    private readonly payheaderRepo: Repository<PayheaderTypeOrmEntity>,
    @InjectRepository(PaydetailTypeOrmEntity)
    private readonly paydetailRepo: Repository<PaydetailTypeOrmEntity>,
  ) {}

  async findAll(): Promise<Invoice[]> {
    const entities = await this.invoiceRepo.find({
      where: { cINVspecial: SPECIAL },
      order: { dINVdate: 'DESC' },
    });
    return entities.map((e) => e.toDomain());
  }

  async findOne(id: string): Promise<Invoice | null> {
    const entity = await this.invoiceRepo.findOne({
      where: { cINVpk: id, cINVspecial: SPECIAL },
    });
    return entity ? entity.toDomain() : null;
  }

  async findDetailsByInvoiceId(invoiceId: string): Promise<InvoiceDetail[]> {
    const entities = await this.detailRepo.find({
      where: { cIVDfkINV: invoiceId },
      order: { nIVDorder: 'ASC' },
    });
    return entities.map((e) => e.toDomain());
  }

  async create(data: Partial<Invoice>): Promise<Invoice> {
    const entity = InvoiceTypeOrmEntity.fromDomain(data);
    const saved = await this.invoiceRepo.save(entity);
    return saved.toDomain();
  }

  async createDetail(data: Partial<InvoiceDetail>): Promise<InvoiceDetail> {
    const entity = InvoiceDetailTypeOrmEntity.fromDomain(data);
    const saved = await this.detailRepo.save(entity);
    return saved.toDomain();
  }

  async detailExists(id: string): Promise<boolean> {
    return this.detailRepo.exists({ where: { cIVDpk: id } });
  }

  async update(id: string, data: Partial<Invoice>): Promise<void> {
    const entity = InvoiceTypeOrmEntity.fromDomain(data);
    const updateFields: Partial<InvoiceTypeOrmEntity> = {};
    Object.keys(entity).forEach((key) => {
      if (entity[key] !== undefined && entity[key] !== null && key !== 'cINVpk') {
        updateFields[key] = entity[key];
      }
    });
    await this.invoiceRepo.update({ cINVpk: id }, updateFields);
  }

  async deleteDetailsByInvoiceId(invoiceId: string): Promise<void> {
    await this.detailRepo.delete({ cIVDfkINV: invoiceId });
  }

  async delete(id: string): Promise<void> {
    await this.invoiceRepo.delete({ cINVpk: id });
  }

  async exists(id: string): Promise<boolean> {
    return this.invoiceRepo.exists({ where: { cINVpk: id } });
  }

  async sumAmountsByInvoiceIds(invoiceIds: string[]): Promise<Map<string, number>> {
    const map = new Map<string, number>();
    if (!invoiceIds.length) return map;
    const rows = await this.detailRepo
      .createQueryBuilder('d')
      .innerJoin('invoice', 'i', 'i.cINVpk = d.cIVDfkINV')
      .innerJoin(
        (qb) =>
          qb
            .select('cIVDfkINV', 'invId')
            .addSelect('COUNT(*)', 'rowCount')
            .from('invoicedetail', 'dc')
            .where('dc.cIVDfkINV IN (:...ids)', { ids: invoiceIds })
            .groupBy('dc.cIVDfkINV'),
        'cnt',
        'cnt.invId = d.cIVDfkINV',
      )
      .select('d.cIVDfkINV', 'invoiceId')
      .addSelect(
        `SUM(
          ((d.nIVDAmount * (1 - i.nInvDisc1/100) * (1 - i.nInvDisc2/100) * (1 - i.nInvDisc3/100))
          - (i.nINVdisc / cnt.rowCount))
          * IF(d.nIVDstkppn = 1, 1 + i.nINVtax/100, 1)
        ) + MAX(i.nINVfreight)`,
        'total',
      )
      .where('d.cIVDfkINV IN (:...ids)', { ids: invoiceIds })
      .groupBy('d.cIVDfkINV')
      .getRawMany();
    rows.forEach((r) => map.set(r.invoiceId, Number(r.total ?? 0)));
    return map;
  }

  async findOutstandingInvoices(supplierId: string, currencyId: string): Promise<OutstandingInvoiceItem[]> {
    const rows: Array<{
      id: string;
      invoiceNo: string;
      date: Date;
      invoiceAmount: string;
      paidAmount: string;
      balance: string;
    }> = await this.invoiceRepo.manager.query(
      `
      WITH rowcounts AS (
        SELECT cIVDfkINV AS invId, COUNT(*) AS rows2 FROM invoicedetail GROUP BY cIVDfkINV
      ),
      amounts AS (
        SELECT i.cINVpk AS invId,
          SUM(((d.nIVDAmount
            * (1 - i.nInvDisc1/100) * (1 - i.nInvDisc2/100) * (1 - i.nInvDisc3/100))
            - (i.nINVdisc / r.rows2))
            * IF(d.nIVDstkppn = 1, 1 + i.nINVtax/100, 1)
          ) + MAX(i.nINVfreight) AS invoiceAmount
        FROM invoice i
        JOIN invoicedetail d ON d.cIVDfkINV = i.cINVpk
        JOIN rowcounts r ON r.invId = i.cINVpk
        WHERE i.cINVspecial = 'BL'
          AND i.cINVfkENT = ?
          AND i.cINVfkEXC = ?
          AND i.nINVcash = 0
        GROUP BY i.cINVpk
      ),
      payments AS (
        SELECT cPydFkInv AS invId, SUM(nPYDamount) AS paidAmount FROM paydetail GROUP BY cPydFkInv
      )
      SELECT i.cINVpk AS id, i.cINVrefno AS invoiceNo, i.dINVdate AS date,
        a.invoiceAmount, IFNULL(p.paidAmount, 0) AS paidAmount,
        (a.invoiceAmount - IFNULL(p.paidAmount, 0)) AS balance
      FROM invoice i
      JOIN amounts a ON a.invId = i.cINVpk
      LEFT JOIN payments p ON p.invId = i.cINVpk
      HAVING balance <> 0
      ORDER BY i.dINVdate DESC
      `,
      [supplierId, currencyId],
    );

    return rows.map((r) => ({
      id: r.id,
      invoiceNo: r.invoiceNo,
      date: r.date,
      invoiceAmount: Number(r.invoiceAmount),
      paidAmount: Number(r.paidAmount),
      balance: Number(r.balance),
    }));
  }

  async createPayheader(data: Record<string, unknown>): Promise<string> {
    const entity = this.payheaderRepo.create(data as Partial<PayheaderTypeOrmEntity>);
    const saved = await this.payheaderRepo.save(entity);
    return saved.cPHYPk;
  }

  async createPaydetail(data: Record<string, unknown>): Promise<void> {
    const entity = this.paydetailRepo.create(data as Partial<PaydetailTypeOrmEntity>);
    await this.paydetailRepo.save(entity);
  }

  async payheaderExists(id: string): Promise<boolean> {
    return this.payheaderRepo.exists({ where: { cPHYPk: id } });
  }

  async paydetailExists(id: string): Promise<boolean> {
    return this.paydetailRepo.exists({ where: { cPYDpk: id } });
  }

  async deletePaymentByReturnId(returnInvoiceId: string): Promise<void> {
    const refNo = returnInvoiceId.substring(0, 20);
    const headers = await this.payheaderRepo.find({ where: { cPHYrefno: refNo } });
    const headerIds = headers.map((h) => h.cPHYPk);
    if (headerIds.length) {
      await this.paydetailRepo.delete({ cPydFkPhy: In(headerIds) });
      await this.payheaderRepo.delete({ cPHYrefno: refNo });
    }
  }
}
