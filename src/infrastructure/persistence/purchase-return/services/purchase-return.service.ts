import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { IPurchaseReturnRepository, PURCHASE_RETURN_REPOSITORY } from '../../../../core/purchase-return/repositories/purchase-return.repository.interface';
import { EntityTypeOrmEntity } from '../../entity/entities/entity-typeorm.entity';
import { WarehouseTypeOrmEntity } from '../../warehouse/entities/warehouse-typeorm.entity';
import { CurrencyTypeOrmEntity } from '../../currency/entities/currency-typeorm.entity';
import { StockTypeOrmEntity } from '../../stock/entities/stock-typeorm.entity';
import { CreatePurchaseReturnDto } from '../../../../presentation/purchase-return/dto/create-purchase-return.dto';
import {
  PurchaseReturnResponseDto,
  PurchaseReturnLineResponseDto,
  OutstandingInvoiceResponseDto,
} from '../../../../presentation/purchase-return/dto/purchase-return-response.dto';
import { BaseService } from '../../../../core/services/base.service';
import { Invoice } from '../../../../core/invoice/entities/invoice.entity';
import { DEFAULT_INVOICE, DEFAULT_INVOICE_DETAIL } from '../../../../core/invoice/defaults/invoice.defaults';

const RETURN_SPECIAL = 'RL';
const CURRENCY_DEFAULT = '..rupiah...............';
const SALESMAN_DEFAULT = '..default..............';

@Injectable()
export class PurchaseReturnService extends BaseService {
  constructor(
    @Inject(PURCHASE_RETURN_REPOSITORY)
    private readonly purchaseReturnRepository: IPurchaseReturnRepository,
    @InjectRepository(EntityTypeOrmEntity)
    private readonly entityRepo: Repository<EntityTypeOrmEntity>,
    @InjectRepository(WarehouseTypeOrmEntity)
    private readonly warehouseRepo: Repository<WarehouseTypeOrmEntity>,
    @InjectRepository(CurrencyTypeOrmEntity)
    private readonly currencyRepo: Repository<CurrencyTypeOrmEntity>,
    @InjectRepository(StockTypeOrmEntity)
    private readonly stockRepo: Repository<StockTypeOrmEntity>,
  ) {
    super();
  }

  async findAll(): Promise<PurchaseReturnResponseDto[]> {
    const invoices = await this.purchaseReturnRepository.findAll();
    if (!invoices.length) return [];

    const ids = invoices.map((i) => i.id);
    const amountMap = await this.purchaseReturnRepository.sumAmountsByInvoiceIds(ids);

    const supplierIds = [...new Set(invoices.map((i) => i.entityId).filter(Boolean))];
    const warehouseIds = [...new Set(invoices.map((i) => i.warehouseId).filter(Boolean))];
    const currencyIds = [...new Set(invoices.map((i) => i.exchangeId).filter(Boolean))];

    const [suppliers, warehouses, currencies] = await Promise.all([
      supplierIds.length ? this.entityRepo.find({ where: { cENTpk: In(supplierIds) } }) : [],
      warehouseIds.length ? this.warehouseRepo.find({ where: { cWHSpk: In(warehouseIds) } }) : [],
      currencyIds.length ? this.currencyRepo.find({ where: { cEXCpk: In(currencyIds) } }) : [],
    ]);

    const supplierMap = new Map<string, string>(suppliers.map((s) => [s.cENTpk, s.cENTdesc] as [string, string]));
    const warehouseMap = new Map<string, string>(warehouses.map((w) => [w.cWHSpk, w.cWHSdesc] as [string, string]));
    const currencyMap = new Map<string, string>(currencies.map((c) => [c.cEXCpk, c.cEXCdesc] as [string, string]));

    return invoices.map((inv) => ({
      id: inv.id,
      invoiceNo: inv.refNo,
      date: inv.date,
      dueDate: inv.dueDate,
      supplierId: inv.entityId,
      supplierName: supplierMap.get(inv.entityId) ?? null as string | null,
      warehouseId: inv.warehouseId,
      warehouseName: warehouseMap.get(inv.warehouseId) ?? null as string | null,
      currencyId: inv.exchangeId,
      currencyName: currencyMap.get(inv.exchangeId) ?? null as string | null,
      isCash: inv.isCash,
      discount1: inv.discount1,
      discount2: inv.discount2,
      discount3: inv.discount3,
      discount: inv.discount,
      freight: inv.freight,
      freightPct: inv.persen,
      tax: inv.tax,
      po: inv.po,
      taxInvoice: inv.taxInvoice,
      remark: inv.remark,
      sj: inv.sj,
      tglSj: inv.tglSj,
      isPaid: inv.isPaid,
      scan1: inv.scan1,
      scan2: inv.scan2,
      scan3: inv.scan3,
      scan4: inv.scan4,
      totalAmount: amountMap.get(inv.id) ?? 0,
      returnTo: inv.returnTo,
      invoiceReturnTo: inv.transfer !== 'n/a' ? inv.transfer : null,
    }));
  }

  async findOne(id: string): Promise<PurchaseReturnResponseDto> {
    const invoice = await this.purchaseReturnRepository.findOne(id);
    if (!invoice) throw new NotFoundException(`Purchase Return invoice ${id} not found`);

    const details = await this.purchaseReturnRepository.findDetailsByInvoiceId(id);

    const [supplierEntity, warehouseEntity, currencyEntity] = await Promise.all([
      invoice.entityId ? this.entityRepo.findOne({ where: { cENTpk: invoice.entityId } }) : null,
      invoice.warehouseId ? this.warehouseRepo.findOne({ where: { cWHSpk: invoice.warehouseId } }) : null,
      invoice.exchangeId ? this.currencyRepo.findOne({ where: { cEXCpk: invoice.exchangeId } }) : null,
    ]);

    const stockIds = [...new Set(details.map((d) => d.stockId).filter(Boolean))];
    const stocks = stockIds.length
      ? await this.stockRepo.find({ where: { cSTKpk: In(stockIds) } })
      : [];
    const stockMap = new Map(stocks.map((s) => [s.cSTKpk, s.cSTKdesc]));

    const lines: PurchaseReturnLineResponseDto[] = details.map((d) => ({
      id: d.id,
      stockId: d.stockId,
      stockCode: d.code,
      stockName: stockMap.get(d.stockId) ?? null,
      unit: d.unit,
      qty: d.qtyOut,
      price: d.price,
      disc1: d.disc1,
      disc2: d.disc2,
      disc3: d.disc3,
      disc: d.disc,
      amount: d.amount,
      onHand: d.onHand,
      order: d.order,
      taxable: d.stkppn === 1,
    }));

    return {
      id: invoice.id,
      invoiceNo: invoice.refNo,
      date: invoice.date,
      dueDate: invoice.dueDate,
      supplierId: invoice.entityId,
      supplierName: supplierEntity?.cENTdesc ?? null,
      warehouseId: invoice.warehouseId,
      warehouseName: warehouseEntity?.cWHSdesc ?? null,
      currencyId: invoice.exchangeId,
      currencyName: currencyEntity?.cEXCdesc ?? null,
      isCash: invoice.isCash,
      discount1: invoice.discount1,
      discount2: invoice.discount2,
      discount3: invoice.discount3,
      discount: invoice.discount,
      freight: invoice.freight,
      freightPct: invoice.persen,
      tax: invoice.tax,
      po: invoice.po,
      taxInvoice: invoice.taxInvoice,
      remark: invoice.remark,
      sj: invoice.sj,
      tglSj: invoice.tglSj,
      isPaid: invoice.isPaid,
      scan1: invoice.scan1,
      scan2: invoice.scan2,
      scan3: invoice.scan3,
      scan4: invoice.scan4,
      totalAmount: lines.reduce((sum, l) => sum + (l.amount ?? 0), 0),
      returnTo: invoice.returnTo,
      invoiceReturnTo: invoice.transfer !== 'n/a' ? invoice.transfer : null,
      lines,
    };
  }

  async create(dto: CreatePurchaseReturnDto): Promise<PurchaseReturnResponseDto> {
    const id = await this.generateUniqueId(
      (id) => this.purchaseReturnRepository.exists(id),
      'Unable to generate a unique primary key for Purchase Return invoice',
    );

    const supplierEntity = dto.supplierId
      ? await this.entityRepo.findOne({ where: { cENTpk: dto.supplierId } })
      : null;

    const invoiceData: Partial<Invoice> = {
      ...DEFAULT_INVOICE,
      id,
      special: RETURN_SPECIAL,
      refNo: dto.invoiceNo.toUpperCase(),
      date: new Date(dto.date),
      entityId: dto.supplierId,
      entityCode: supplierEntity?.cENTcode ?? null,
      warehouseId: dto.warehouseId,
      exchangeId: dto.currencyId ?? CURRENCY_DEFAULT,
      salesmanId: SALESMAN_DEFAULT,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      isCash: dto.isCash ?? true,
      discount1: dto.discount1 ?? 0,
      discount2: dto.discount2 ?? 0,
      discount3: dto.discount3 ?? 0,
      discount: dto.discount ?? 0,
      freight: dto.freight ?? 0,
      persen: dto.freightPct ?? 0,
      tax: dto.tax ?? 0,
      po: dto.po ?? ' ',
      taxInvoice: dto.taxInvoice ?? ' ',
      remark: dto.remark ?? ' ',
      sj: dto.sj ?? '',
      tglSj: dto.tglSj ? new Date(dto.tglSj) : null,
      isPaid: dto.isPaid ?? false,
      scan1: dto.scan1 ?? '',
      scan2: dto.scan2 ?? '',
      scan3: dto.scan3 ?? '',
      scan4: dto.scan4 ?? '',
      returnTo: dto.returnTo ?? '',
      transfer: dto.invoiceReturnTo ?? 'n/a',
    };

    await this.purchaseReturnRepository.create(invoiceData);

    for (let index = 0; index < dto.lines.length; index++) {
      const line = dto.lines[index];
      const detailId = await this.generateUniqueId(
        (did) => this.purchaseReturnRepository.detailExists(did),
        'Unable to generate a unique primary key for Purchase Return detail',
      );
      await this.purchaseReturnRepository.createDetail({
        ...DEFAULT_INVOICE_DETAIL,
        id: detailId,
        invoiceId: id,
        stockId: line.stockId,
        code: line.stockCode?.toUpperCase() ?? null,
        unit: line.unit ?? null,
        qtyOut: line.qty,
        zQtyOut: line.qty,
        qtyIn: 0,
        zQtyIn: 0,
        price: line.price,
        disc1: line.disc1 ?? 0,
        disc2: line.disc2 ?? 0,
        disc3: line.disc3 ?? 0,
        disc: line.disc ?? 0,
        amount: line.amount ?? null,
        onHand: line.onHand ?? 0,
        stkppn: line.taxable ? 1 : 0,
        order: index + 1,
      });
    }

    if (!dto.isCash && dto.invoiceReturnTo) {
      await this._createPaymentRecord(id, invoiceData, dto);
    }

    return this.findOne(id);
  }

  async update(id: string, dto: CreatePurchaseReturnDto): Promise<PurchaseReturnResponseDto> {
    const existing = await this.purchaseReturnRepository.findOne(id);
    if (!existing) throw new NotFoundException(`Purchase Return invoice ${id} not found`);

    await this.purchaseReturnRepository.deletePaymentByReturnId(id);

    const supplierEntity = dto.supplierId
      ? await this.entityRepo.findOne({ where: { cENTpk: dto.supplierId } })
      : null;

    const invoiceData: Partial<Invoice> = {
      refNo: dto.invoiceNo.toUpperCase(),
      date: new Date(dto.date),
      entityId: dto.supplierId,
      entityCode: supplierEntity?.cENTcode ?? null,
      warehouseId: dto.warehouseId,
      exchangeId: dto.currencyId ?? CURRENCY_DEFAULT,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      isCash: dto.isCash ?? true,
      discount1: dto.discount1 ?? 0,
      discount2: dto.discount2 ?? 0,
      discount3: dto.discount3 ?? 0,
      discount: dto.discount ?? 0,
      freight: dto.freight ?? 0,
      persen: dto.freightPct ?? 0,
      tax: dto.tax ?? 0,
      po: dto.po ?? ' ',
      taxInvoice: dto.taxInvoice ?? ' ',
      remark: dto.remark ?? ' ',
      sj: dto.sj ?? '',
      tglSj: dto.tglSj ? new Date(dto.tglSj) : null,
      isPaid: dto.isPaid ?? false,
      scan1: dto.scan1 ?? '',
      scan2: dto.scan2 ?? '',
      scan3: dto.scan3 ?? '',
      scan4: dto.scan4 ?? '',
      returnTo: dto.returnTo ?? '',
      transfer: dto.invoiceReturnTo ?? 'n/a',
    };

    await this.purchaseReturnRepository.update(id, invoiceData);
    await this.purchaseReturnRepository.deleteDetailsByInvoiceId(id);

    for (let index = 0; index < dto.lines.length; index++) {
      const line = dto.lines[index];
      const detailId = await this.generateUniqueId(
        (did) => this.purchaseReturnRepository.detailExists(did),
        'Unable to generate a unique primary key for Purchase Return detail',
      );
      await this.purchaseReturnRepository.createDetail({
        ...DEFAULT_INVOICE_DETAIL,
        id: detailId,
        invoiceId: id,
        stockId: line.stockId,
        code: line.stockCode?.toUpperCase() ?? null,
        unit: line.unit ?? null,
        qtyOut: line.qty,
        zQtyOut: line.qty,
        qtyIn: 0,
        zQtyIn: 0,
        price: line.price,
        disc1: line.disc1 ?? 0,
        disc2: line.disc2 ?? 0,
        disc3: line.disc3 ?? 0,
        disc: line.disc ?? 0,
        amount: line.amount ?? null,
        onHand: line.onHand ?? 0,
        stkppn: line.taxable ? 1 : 0,
        order: index + 1,
      });
    }

    if (!dto.isCash && dto.invoiceReturnTo) {
      await this._createPaymentRecord(id, invoiceData, dto);
    }

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const existing = await this.purchaseReturnRepository.findOne(id);
    if (!existing) throw new NotFoundException(`Purchase Return invoice ${id} not found`);
    await this.purchaseReturnRepository.deletePaymentByReturnId(id);
    await this.purchaseReturnRepository.deleteDetailsByInvoiceId(id);
    await this.purchaseReturnRepository.delete(id);
  }

  async findOutstandingInvoices(supplierId: string, currencyId: string): Promise<OutstandingInvoiceResponseDto[]> {
    return this.purchaseReturnRepository.findOutstandingInvoices(supplierId, currencyId);
  }

  private async _createPaymentRecord(
    returnInvoiceId: string,
    invoice: Partial<Invoice>,
    dto: CreatePurchaseReturnDto,
  ): Promise<void> {
    const amountMap = await this.purchaseReturnRepository.sumAmountsByInvoiceIds([returnInvoiceId]);
    const total = amountMap.get(returnInvoiceId) ?? 0;

    const outstanding = await this.purchaseReturnRepository.findOutstandingInvoices(
      dto.supplierId,
      dto.currencyId ?? CURRENCY_DEFAULT,
    );
    const targetInvoice = outstanding.find((o) => o.id === dto.invoiceReturnTo);
    if (!targetInvoice) {
      throw new BadRequestException('The selected invoice for offset is no longer outstanding or does not match supplier/currency.');
    }
    if (total > targetInvoice.balance) {
      throw new BadRequestException(
        `Return total (${total}) exceeds the outstanding balance (${targetInvoice.balance}) of the selected invoice.`,
      );
    }

    const payheaderId = await this.generateUniqueId(
      (id) => this.purchaseReturnRepository.payheaderExists(id),
      'Unable to generate a unique primary key for payheader',
    );

    await this.purchaseReturnRepository.createPayheader({
      cPHYPk: payheaderId,
      cPHYrefno: returnInvoiceId.substring(0, 20),
      cPHYfkExc: invoice.exchangeId,
      dPHYDate: invoice.date,
      cPHYfkEnt: invoice.entityId,
      nPHYcash: total,
      cPHYCode: 'SU',
      cPHyfkEntCode: invoice.entityCode,
      cPHYtipe: 'RT',
      nPHYcair: 1,
      cphyfkwhs: invoice.warehouseId,
    });

    const paydetailId = await this.generateUniqueId(
      (id) => this.purchaseReturnRepository.paydetailExists(id),
      'Unable to generate a unique primary key for paydetail',
    );

    await this.purchaseReturnRepository.createPaydetail({
      cPYDpk: paydetailId,
      cPydFkInv: dto.invoiceReturnTo,
      nPYDamount: total,
      cPydFkPhy: payheaderId,
      dPydDate: invoice.date,
      dPydtgl: invoice.date,
      dPydjatuh: invoice.date,
      nPydnilai: 0,
      nPydsisa: 0,
      nPydcheck: 0,
      cPydrefno: returnInvoiceId.substring(0, 20),
    });
  }
}
