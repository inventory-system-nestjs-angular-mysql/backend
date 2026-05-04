import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataSource, Repository } from 'typeorm';
import { PayheaderTypeOrmEntity } from '../../payment/entities/payheader-typeorm.entity';
import { PaydetailTypeOrmEntity } from '../../payment/entities/paydetail-typeorm.entity';
import { YmkTypeOrmEntity } from '../../ymk/entities/ymk-typeorm.entity';
import {
  ISupplierPaymentRepository,
  PayheaderData,
  PaydetailData,
  OutstandingInvoiceItem,
  SupplierLookupItem,
  InvoiceLookupResult,
} from '../../../../core/supplier-payment/repositories/supplier-payment.repository.interface';

@Injectable()
export class SupplierPaymentRepository implements ISupplierPaymentRepository {
  constructor(
    @InjectRepository(PayheaderTypeOrmEntity)
    private readonly payheaderRepo: Repository<PayheaderTypeOrmEntity>,
    @InjectRepository(PaydetailTypeOrmEntity)
    private readonly paydetailRepo: Repository<PaydetailTypeOrmEntity>,
    @InjectRepository(YmkTypeOrmEntity)
    private readonly ymkRepo: Repository<YmkTypeOrmEntity>,
    private readonly dataSource: DataSource,
  ) {}

  private toPayheaderData(e: PayheaderTypeOrmEntity): PayheaderData {
    return {
      id: e.cPHYPk,
      refNo: e.cPHYrefno,
      currencyId: e.cPHYfkExc,
      date: e.dPHYDate ? new Date(e.dPHYDate) : null,
      remark: e.cPHYremark,
      supplierId: e.cPHYfkEnt,
      supplierCode: e.cPHyfkEntCode,
      cash: Number(e.nPHYcash ?? 0),
      bankTransfer: Number(e.nPHYtransfer ?? 0),
      creditCard: Number(e.nPHYccard ?? 0),
      debitCard: Number(e.nPHYdcard ?? 0),
      voucher: Number(e.nPHYvoucher ?? 0),
      cheque: Number(e.nPHYcheque ?? 0),
      fromBank: e.cPHYbank1,
      chequeNo: e.cPHYcekno,
      chequeDate: e.cPHYcektgl ? new Date(e.cPHYcektgl) : null,
      code: e.cPHYCode,
      tipe: e.cPHYtipe,
      cair: e.nPHYcair,
      warehouseId: e.cphyfkwhs,
    };
  }

  private toPaydetailData(e: PaydetailTypeOrmEntity): PaydetailData {
    return {
      id: e.cPYDpk,
      type: e.cPYDtype,
      invoiceId: e.cPydFkInv,
      amount: Number(e.nPYDamount ?? 0),
      headerId: e.cPydFkPhy,
      order: e.nPydOrder,
      date: e.dPydDate ? new Date(e.dPydDate) : null,
      tgl: e.dPydtgl ? new Date(e.dPydtgl) : null,
      dueDate: e.dPydjatuh ? new Date(e.dPydjatuh) : null,
      nilai: Number(e.nPydnilai ?? 0),
      sisa: Number(e.nPydsisa ?? 0),
      check: e.nPydcheck,
      refNo: e.cPydrefno,
    };
  }

  async findAll(): Promise<PayheaderData[]> {
    const rows = await this.payheaderRepo.find({
      where: { cPHYCode: 'SU', cPHYtipe: 'PY' },
      order: { dPHYDate: 'DESC' },
    });
    return rows.map((r) => this.toPayheaderData(r));
  }

  async findOne(id: string): Promise<PayheaderData | null> {
    const e = await this.payheaderRepo.findOne({ where: { cPHYPk: id, cPHYCode: 'SU', cPHYtipe: 'PY' } });
    return e ? this.toPayheaderData(e) : null;
  }

  async findDetailsByHeaderId(headerId: string): Promise<PaydetailData[]> {
    const rows = await this.paydetailRepo.find({
      where: { cPydFkPhy: headerId },
      order: { nPydOrder: 'ASC' },
    });
    return rows.map((r) => this.toPaydetailData(r));
  }

  async createHeader(data: Partial<PayheaderData>): Promise<void> {
    const e = this.payheaderRepo.create({
      cPHYPk: data.id,
      cPHYrefno: data.refNo ?? null,
      cPHYfkExc: data.currencyId ?? null,
      dPHYDate: data.date ?? null,
      cPHYremark: data.remark ?? null,
      cPHYfkEnt: data.supplierId ?? null,
      cPHyfkEntCode: data.supplierCode ?? null,
      nPHYcash: data.cash ?? 0,
      nPHYtransfer: data.bankTransfer ?? 0,
      nPHYccard: data.creditCard ?? 0,
      nPHYdcard: data.debitCard ?? 0,
      nPHYvoucher: data.voucher ?? 0,
      nPHYcheque: data.cheque ?? 0,
      cPHYbank1: data.fromBank ?? null,
      cPHYcekno: data.chequeNo ?? null,
      cPHYcektgl: data.chequeDate ?? null,
      cPHYCode: data.code ?? 'SU',
      cPHYtipe: data.tipe ?? 'PY',
      nPHYcair: data.cair ?? 1,
      cphyfkwhs: data.warehouseId ?? null,
    });
    await this.payheaderRepo.save(e);
  }

  async createDetail(data: Partial<PaydetailData>): Promise<void> {
    const e = this.paydetailRepo.create({
      cPYDpk: data.id,
      cPYDtype: data.type ?? 'PY',
      cPydFkInv: data.invoiceId ?? null,
      nPYDamount: data.amount ?? 0,
      cPydFkPhy: data.headerId ?? null,
      nPydOrder: data.order ?? 0,
      dPydDate: data.date ?? null,
      dPydtgl: data.tgl ?? null,
      dPydjatuh: data.dueDate ?? null,
      nPydnilai: 0,
      nPydsisa: 0,
      nPydcheck: 0,
      cPydrefno: data.refNo ?? null,
    });
    await this.paydetailRepo.save(e);
  }

  async updateHeader(id: string, data: Partial<PayheaderData>): Promise<void> {
    await this.payheaderRepo.update(
      { cPHYPk: id },
      {
        cPHYrefno: data.refNo ?? undefined,
        cPHYfkExc: data.currencyId ?? undefined,
        dPHYDate: data.date ?? undefined,
        cPHYremark: data.remark ?? undefined,
        cPHYfkEnt: data.supplierId ?? undefined,
        cPHyfkEntCode: data.supplierCode ?? undefined,
        nPHYcash: data.cash ?? 0,
        nPHYtransfer: data.bankTransfer ?? 0,
        nPHYccard: data.creditCard ?? 0,
        nPHYdcard: data.debitCard ?? 0,
        nPHYvoucher: data.voucher ?? 0,
        nPHYcheque: data.cheque ?? 0,
        cPHYbank1: data.fromBank ?? null,
        cPHYcekno: data.chequeNo ?? null,
        cPHYcektgl: data.chequeDate ?? null,
        cphyfkwhs: data.warehouseId ?? null,
      },
    );
  }

  async deleteDetailsByHeaderId(headerId: string): Promise<void> {
    await this.paydetailRepo.delete({ cPydFkPhy: headerId });
  }

  async deleteHeader(id: string): Promise<void> {
    await this.payheaderRepo.delete({ cPHYPk: id });
  }

  async exists(id: string): Promise<boolean> {
    return this.payheaderRepo.exists({ where: { cPHYPk: id } });
  }

  async detailExists(id: string): Promise<boolean> {
    return this.paydetailRepo.exists({ where: { cPYDpk: id } });
  }

  async refNoExists(refNo: string): Promise<boolean> {
    return this.payheaderRepo.exists({ where: { cPHYrefno: refNo, cPHYCode: 'SU', cPHYtipe: 'PY' } });
  }

  async getNextInvoiceNo(): Promise<string> {
    const ymk = await this.ymkRepo.findOne({ where: {} as any });
    if (!ymk || !ymk.l_sbayar) return '1';
    const last = ymk.l_sbayar.trim();
    if (/^[0-9]+$/.test(last)) {
      return String(parseInt(last, 10) + 1);
    }
    return last;
  }

  async updateLastInvoiceNo(no: string): Promise<void> {
    await this.ymkRepo
      .createQueryBuilder()
      .update()
      .set({ l_sbayar: no })
      .limit(1)
      .execute();
  }

  async findOutstandingInvoices(supplierId: string, currencyId: string): Promise<OutstandingInvoiceItem[]> {
    const rows = await this.dataSource.query(
      `
      WITH rowcounts AS (
        SELECT cIVDfkINV AS invId, COUNT(*) AS rows2
        FROM invoicedetail
        GROUP BY cIVDfkINV
      ),
      invoice_amount AS (
        SELECT i.cINVpk AS invId,
          SUM(
            ((d.nIVDAmount * (1 - i.nInvDisc1/100) * (1 - i.nInvDisc2/100) * (1 - i.nInvDisc3/100))
              - (i.nINVdisc / r.rows2))
            * IF(d.nIVDstkppn = 1, 1 + i.nINVtax/100, 1)
          ) + MAX(i.nINVfreight) AS amount
        FROM invoice i
        JOIN invoicedetail d ON d.cIVDfkINV = i.cINVpk
        JOIN rowcounts r ON r.invId = i.cINVpk
        WHERE i.cINVspecial IN ('BL', 'RB', 'KS')
          AND i.cINVfkENT = ?
          AND i.cINVfkEXC = ?
        GROUP BY i.cINVpk
      ),
      payment_summary AS (
        SELECT cPydFkInv AS invId, SUM(nPYDamount) AS total_payment
        FROM paydetail
        GROUP BY cPydFkInv
      )
      SELECT
        i.cINVpk AS id,
        TRIM(i.cINVrefno) AS invoiceNo,
        i.dINVdate AS date,
        i.dINVdue AS dueDate,
        a.amount,
        CASE
          WHEN i.cINVspecial = 'RB'
            THEN -(a.amount - IFNULL(p.total_payment, 0))
          ELSE
            a.amount - IF(i.nINVcash = 1, a.amount, IFNULL(p.total_payment, 0))
        END AS balance,
        i.cINVspecial AS special
      FROM invoice i
      JOIN invoice_amount a ON a.invId = i.cINVpk
      LEFT JOIN payment_summary p ON p.invId = i.cINVpk
      WHERE i.cINVfkENT = ?
        AND i.cINVfkEXC = ?
        AND i.dINVdate <= '3000-01-01'
      HAVING balance <> 0
      ORDER BY i.dINVdate
      `,
      [supplierId, currencyId, supplierId, currencyId],
    );
    return rows.map((r: any) => ({
      id: r.id,
      invoiceNo: r.invoiceNo,
      date: r.date,
      dueDate: r.dueDate,
      amount: Number(r.amount ?? 0),
      balance: Number(r.balance ?? 0),
      special: r.special,
    }));
  }

  async searchByInvoiceNo(invoiceNo: string): Promise<InvoiceLookupResult | null> {
    const rows = await this.dataSource.query(
      `SELECT cINVfkENT AS supplierId, cINVfkWHS AS warehouseId, cINVfkEXC AS currencyId
       FROM invoice
       WHERE cINVrefno = ?
         AND cINVspecial IN ('BL', 'KS', 'RB')
       LIMIT 1`,
      [invoiceNo],
    );
    if (!rows.length) return null;
    return {
      supplierId: rows[0].supplierId ?? null,
      warehouseId: rows[0].warehouseId ?? null,
      currencyId: rows[0].currencyId ?? null,
    };
  }

  async searchSupplierByName(name: string): Promise<SupplierLookupItem[]> {
    const trimmed = name.trim();
    const spaceIdx = trimmed.indexOf(' ');
    let whereClause: string;
    const params: string[] = [];

    if (spaceIdx === -1) {
      whereClause = 'cENTdesc LIKE ?';
      params.push(`%${trimmed}%`);
    } else {
      const first = trimmed.substring(0, spaceIdx).trim();
      const second = trimmed.substring(spaceIdx).trim();
      whereClause = '(cENTdesc LIKE ? OR cENTdesc LIKE ?)';
      params.push(`%${first}%${second}%`, `%${second}%${first}%`);
    }

    const rows = await this.dataSource.query(
      `SELECT cENTpk AS id, cENTcode AS code, cENTdesc AS name
       FROM entity
       WHERE nENTsupp = 1 AND nENTsuspend <> 1 AND ${whereClause}
       ORDER BY cENTdesc
       LIMIT 100`,
      params,
    );
    return rows.map((r: any) => ({ id: r.id, code: r.code, name: r.name }));
  }
}
