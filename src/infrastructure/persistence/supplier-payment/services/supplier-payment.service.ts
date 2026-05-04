import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';

function toDateStr(value: any): string | null {
  if (!value) return null;
  const d = new Date(value);
  if (isNaN(d.getTime())) return null;
  return d.toISOString().split('T')[0];
}
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import {
  ISupplierPaymentRepository,
  SUPPLIER_PAYMENT_REPOSITORY,
  OutstandingInvoiceItem,
  SupplierLookupItem,
  InvoiceLookupResult,
} from '../../../../core/supplier-payment/repositories/supplier-payment.repository.interface';
import { EntityTypeOrmEntity } from '../../entity/entities/entity-typeorm.entity';
import { CurrencyTypeOrmEntity } from '../../currency/entities/currency-typeorm.entity';
import { WarehouseTypeOrmEntity } from '../../warehouse/entities/warehouse-typeorm.entity';
import { BankTypeOrmEntity } from '../../bank/entities/bank-typeorm.entity';
import { CreateSupplierPaymentDto } from '../../../../presentation/supplier-payment/dto/create-supplier-payment.dto';
import {
  SupplierPaymentResponseDto,
  SupplierPaymentLineResponseDto,
  OutstandingInvoiceResponseDto,
  SupplierLookupResponseDto,
  InvoiceLookupResponseDto,
} from '../../../../presentation/supplier-payment/dto/supplier-payment-response.dto';
import { BaseService } from '../../../../core/services/base.service';

@Injectable()
export class SupplierPaymentService extends BaseService {
  constructor(
    @Inject(SUPPLIER_PAYMENT_REPOSITORY)
    private readonly repo: ISupplierPaymentRepository,
    @InjectRepository(EntityTypeOrmEntity)
    private readonly entityRepo: Repository<EntityTypeOrmEntity>,
    @InjectRepository(CurrencyTypeOrmEntity)
    private readonly currencyRepo: Repository<CurrencyTypeOrmEntity>,
    @InjectRepository(WarehouseTypeOrmEntity)
    private readonly warehouseRepo: Repository<WarehouseTypeOrmEntity>,
    @InjectRepository(BankTypeOrmEntity)
    private readonly bankRepo: Repository<BankTypeOrmEntity>,
  ) {
    super();
  }

  async findAll(): Promise<SupplierPaymentResponseDto[]> {
    const headers = await this.repo.findAll();
    if (!headers.length) return [];

    const supplierIds = [...new Set(headers.map((h) => h.supplierId).filter(Boolean))];
    const currencyIds = [...new Set(headers.map((h) => h.currencyId).filter(Boolean))];
    const warehouseIds = [...new Set(headers.map((h) => h.warehouseId).filter(Boolean))];
    const bankIds = [...new Set(headers.map((h) => h.fromBank).filter(Boolean))];

    const [suppliers, currencies, warehouses, banks] = await Promise.all([
      supplierIds.length ? this.entityRepo.find({ where: { cENTpk: In(supplierIds) } }) : [],
      currencyIds.length ? this.currencyRepo.find({ where: { cEXCpk: In(currencyIds) } }) : [],
      warehouseIds.length ? this.warehouseRepo.find({ where: { cWHSpk: In(warehouseIds) } }) : [],
      bankIds.length ? this.bankRepo.find({ where: { cBANpk: In(bankIds) } }) : [],
    ]);

    const supplierMap = new Map<string, string>(suppliers.map((s) => [s.cENTpk, s.cENTdesc] as [string, string]));
    const currencyMap = new Map<string, string>(currencies.map((c) => [c.cEXCpk, c.cEXCdesc ?? ''] as [string, string]));
    const warehouseMap = new Map<string, string>(warehouses.map((w) => [w.cWHSpk, w.cWHSdesc ?? ''] as [string, string]));
    const bankMap = new Map<string, string>(banks.map((b) => [b.cBANpk, b.cBANdesc] as [string, string]));

    return headers.map((h) => {
      const totalPaid = h.cash + h.bankTransfer + h.creditCard + h.debitCard + h.voucher + h.cheque;
      return {
        id: h.id,
        invoiceNo: h.refNo,
        date: toDateStr(h.date),
        supplierId: h.supplierId,
        supplierCode: h.supplierCode,
        supplierName: supplierMap.get(h.supplierId ?? '') ?? null,
        currencyId: h.currencyId,
        currencyName: currencyMap.get(h.currencyId ?? '') ?? null,
        warehouseId: h.warehouseId,
        warehouseName: warehouseMap.get(h.warehouseId ?? '') ?? null,
        remark: h.remark,
        cash: h.cash,
        bankTransfer: h.bankTransfer,
        creditCard: h.creditCard,
        debitCard: h.debitCard,
        voucher: h.voucher,
        cheque: h.cheque,
        fromBankId: h.fromBank,
        fromBankName: bankMap.get(h.fromBank ?? '') ?? null,
        chequeNo: h.chequeNo,
        chequeDate: toDateStr(h.chequeDate),
        totalPaid,
      };
    });
  }

  async findOne(id: string): Promise<SupplierPaymentResponseDto> {
    const header = await this.repo.findOne(id);
    if (!header) throw new NotFoundException(`Supplier payment ${id} not found`);

    const details = await this.repo.findDetailsByHeaderId(id);

    const [supplier, currency, warehouse, bank] = await Promise.all([
      header.supplierId ? this.entityRepo.findOne({ where: { cENTpk: header.supplierId } }) : null,
      header.currencyId ? this.currencyRepo.findOne({ where: { cEXCpk: header.currencyId } }) : null,
      header.warehouseId ? this.warehouseRepo.findOne({ where: { cWHSpk: header.warehouseId } }) : null,
      header.fromBank ? this.bankRepo.findOne({ where: { cBANpk: header.fromBank } }) : null,
    ]);

    const lines: SupplierPaymentLineResponseDto[] = details.map((d) => ({
      invoiceId: d.invoiceId,
      invoiceNo: d.refNo,
      amount: d.amount,
      remark: null,
      dueDate: toDateStr(d.dueDate),
      order: d.order,
    }));

    const totalPaid = header.cash + header.bankTransfer + header.creditCard + header.debitCard + header.voucher + header.cheque;

    return {
      id: header.id,
      invoiceNo: header.refNo,
      date: toDateStr(header.date),
      supplierId: header.supplierId,
      supplierCode: header.supplierCode,
      supplierName: supplier?.cENTdesc ?? null,
      currencyId: header.currencyId,
      currencyName: currency?.cEXCdesc ?? null,
      warehouseId: header.warehouseId,
      warehouseName: warehouse?.cWHSdesc ?? null,
      remark: header.remark,
      cash: header.cash,
      bankTransfer: header.bankTransfer,
      creditCard: header.creditCard,
      debitCard: header.debitCard,
      voucher: header.voucher,
      cheque: header.cheque,
      fromBankId: header.fromBank,
      fromBankName: bank?.cBANdesc ?? null,
      chequeNo: header.chequeNo,
      chequeDate: toDateStr(header.chequeDate),
      totalPaid,
      lines,
    };
  }

  async getNextInvoiceNo(): Promise<string> {
    return this.repo.getNextInvoiceNo();
  }

  async create(dto: CreateSupplierPaymentDto): Promise<SupplierPaymentResponseDto> {
    const totalPaid = (dto.cash ?? 0) + (dto.bankTransfer ?? 0) + (dto.creditCard ?? 0) +
      (dto.debitCard ?? 0) + (dto.voucher ?? 0) + (dto.cheque ?? 0);
    const invoicesValue = dto.lines.reduce((s, l) => s + l.amount, 0);
    const diff = Math.abs(totalPaid - invoicesValue);
    if (diff > 0.01) {
      throw new BadRequestException(
        `Total Paid (${totalPaid}) must equal Invoice(s) value (${invoicesValue}).`,
      );
    }

    if (!dto.lines.length) {
      throw new BadRequestException('At least one invoice line is required.');
    }

    // Generate unique header ID
    const id = await this.generateUniqueId(
      (i) => this.repo.exists(i),
      'Unable to generate unique ID for supplier payment',
    );

    // Get and lock invoice no (loop until not duplicate)
    let refNo = dto.invoiceNo.trim().toUpperCase();
    while (await this.repo.refNoExists(refNo)) {
      const numeric = /^[0-9]+$/.test(refNo);
      if (numeric) {
        refNo = String(parseInt(refNo, 10) + 1);
      } else {
        throw new BadRequestException(`Payment No "${refNo}" already exists.`);
      }
    }

    await this.repo.createHeader({
      id,
      refNo,
      currencyId: dto.currencyId ?? null,
      date: new Date(dto.date),
      remark: dto.remark ?? null,
      supplierId: dto.supplierId,
      supplierCode: dto.supplierCode,
      cash: dto.cash ?? 0,
      bankTransfer: dto.bankTransfer ?? 0,
      creditCard: dto.creditCard ?? 0,
      debitCard: dto.debitCard ?? 0,
      voucher: dto.voucher ?? 0,
      cheque: dto.cheque ?? 0,
      fromBank: dto.fromBankId ?? null,
      chequeNo: dto.chequeNo ?? null,
      chequeDate: dto.chequeDate ? new Date(dto.chequeDate) : null,
      code: 'SU',
      tipe: 'PY',
      cair: 1,
      warehouseId: dto.warehouseId ?? null,
    });

    for (let i = 0; i < dto.lines.length; i++) {
      const line = dto.lines[i];
      const detailId = await this.generateUniqueId(
        (did) => this.repo.detailExists(did),
        'Unable to generate unique ID for payment detail',
      );
      await this.repo.createDetail({
        id: detailId,
        type: 'PY',
        invoiceId: line.invoiceId,
        amount: line.amount,
        headerId: id,
        order: i + 1,
        date: new Date(dto.date),
        tgl: new Date(dto.date),
        dueDate: line.dueDate ? new Date(line.dueDate) : null,
        refNo: refNo.substring(0, 20),
      });
    }

    // Update ymk last invoice no
    await this.repo.updateLastInvoiceNo(refNo);

    return this.findOne(id);
  }

  async update(id: string, dto: CreateSupplierPaymentDto): Promise<SupplierPaymentResponseDto> {
    const existing = await this.repo.findOne(id);
    if (!existing) throw new NotFoundException(`Supplier payment ${id} not found`);

    const totalPaid = (dto.cash ?? 0) + (dto.bankTransfer ?? 0) + (dto.creditCard ?? 0) +
      (dto.debitCard ?? 0) + (dto.voucher ?? 0) + (dto.cheque ?? 0);
    const invoicesValue = dto.lines.reduce((s, l) => s + l.amount, 0);
    const diff = Math.abs(totalPaid - invoicesValue);
    if (diff > 0.01) {
      throw new BadRequestException(
        `Total Paid (${totalPaid}) must equal Invoice(s) value (${invoicesValue}).`,
      );
    }

    if (!dto.lines.length) {
      throw new BadRequestException('At least one invoice line is required.');
    }

    await this.repo.updateHeader(id, {
      currencyId: dto.currencyId ?? null,
      date: new Date(dto.date),
      remark: dto.remark ?? null,
      supplierId: dto.supplierId,
      supplierCode: dto.supplierCode,
      cash: dto.cash ?? 0,
      bankTransfer: dto.bankTransfer ?? 0,
      creditCard: dto.creditCard ?? 0,
      debitCard: dto.debitCard ?? 0,
      voucher: dto.voucher ?? 0,
      cheque: dto.cheque ?? 0,
      fromBank: dto.fromBankId ?? null,
      chequeNo: dto.chequeNo ?? null,
      chequeDate: dto.chequeDate ? new Date(dto.chequeDate) : null,
      warehouseId: dto.warehouseId ?? null,
    });

    await this.repo.deleteDetailsByHeaderId(id);

    const refNo = existing.refNo ?? dto.invoiceNo.trim().toUpperCase();
    for (let i = 0; i < dto.lines.length; i++) {
      const line = dto.lines[i];
      const detailId = await this.generateUniqueId(
        (did) => this.repo.detailExists(did),
        'Unable to generate unique ID for payment detail',
      );
      await this.repo.createDetail({
        id: detailId,
        type: 'PY',
        invoiceId: line.invoiceId,
        amount: line.amount,
        headerId: id,
        order: i + 1,
        date: new Date(dto.date),
        tgl: new Date(dto.date),
        dueDate: line.dueDate ? new Date(line.dueDate) : null,
        refNo: refNo.substring(0, 20),
      });
    }

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const existing = await this.repo.findOne(id);
    if (!existing) throw new NotFoundException(`Supplier payment ${id} not found`);
    await this.repo.deleteDetailsByHeaderId(id);
    await this.repo.deleteHeader(id);
  }

  async findOutstandingInvoices(supplierId: string, currencyId: string): Promise<OutstandingInvoiceResponseDto[]> {
    const rows = await this.repo.findOutstandingInvoices(supplierId, currencyId);
    return rows.map((r) => ({
      id: r.id,
      invoiceNo: r.invoiceNo,
      date: toDateStr(r.date),
      dueDate: toDateStr(r.dueDate),
      amount: r.amount,
      balance: r.balance,
      special: r.special,
    }));
  }

  async searchByInvoiceNo(invoiceNo: string): Promise<InvoiceLookupResponseDto | null> {
    return this.repo.searchByInvoiceNo(invoiceNo);
  }

  async searchSupplierByName(name: string): Promise<SupplierLookupResponseDto[]> {
    return this.repo.searchSupplierByName(name);
  }
}
