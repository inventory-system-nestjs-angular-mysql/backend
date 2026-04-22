import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { IPurchasingRepository, PURCHASING_REPOSITORY } from '../../../../core/purchasing/repositories/purchasing.repository.interface';
import { EntityTypeOrmEntity } from '../../entity/entities/entity-typeorm.entity';
import { WarehouseTypeOrmEntity } from '../../warehouse/entities/warehouse-typeorm.entity';
import { CurrencyTypeOrmEntity } from '../../currency/entities/currency-typeorm.entity';
import { StockTypeOrmEntity } from '../../stock/entities/stock-typeorm.entity';
import { CreatePurchasingDto } from '../../../../presentation/purchasing/dto/create-purchasing.dto';
import { PurchasingResponseDto, PurchasingLineResponseDto } from '../../../../presentation/purchasing/dto/purchasing-response.dto';
import { BaseService } from '../../../../core/services/base.service';
import { Invoice } from '../../../../core/invoice/entities/invoice.entity';
import { DEFAULT_INVOICE, DEFAULT_INVOICE_DETAIL } from '../../../../core/invoice/defaults/invoice.defaults';

const PURCHASING_SPECIAL = 'BL';
const CURRENCY_DEFAULT = '..rupiah...............';
const SALESMAN_DEFAULT = '..default..............';

@Injectable()
export class PurchasingService extends BaseService {
  constructor(
    @Inject(PURCHASING_REPOSITORY)
    private readonly purchasingRepository: IPurchasingRepository,
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

  async findAll(): Promise<PurchasingResponseDto[]> {
    const invoices = await this.purchasingRepository.findAll();
    if (!invoices.length) return [];

    const ids = invoices.map((i) => i.id);
    const amountMap = await this.purchasingRepository.sumAmountsByInvoiceIds(ids);

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
    }));
  }

  async findOne(id: string): Promise<PurchasingResponseDto> {
    const invoice = await this.purchasingRepository.findOne(id);
    if (!invoice) throw new NotFoundException(`Purchasing invoice ${id} not found`);

    const details = await this.purchasingRepository.findDetailsByInvoiceId(id);

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

    const lines: PurchasingLineResponseDto[] = details.map((d) => ({
      id: d.id,
      stockId: d.stockId,
      stockCode: d.code,
      stockName: stockMap.get(d.stockId) ?? null,
      unit: d.unit,
      qty: d.qtyIn,
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
      lines,
    };
  }

  async create(dto: CreatePurchasingDto): Promise<PurchasingResponseDto> {
    const id = await this.generateUniqueId(
      (id) => this.purchasingRepository.exists(id),
      'Unable to generate a unique primary key for Purchasing invoice',
    );

    const invoiceData: Partial<Invoice> = {
      ...DEFAULT_INVOICE,
      id,
      special: PURCHASING_SPECIAL,
      refNo: dto.invoiceNo.toUpperCase(),
      date: new Date(dto.date),
      entityId: dto.supplierId,
      warehouseId: dto.warehouseId,
      exchangeId: dto.currencyId ?? CURRENCY_DEFAULT,
      salesmanId: SALESMAN_DEFAULT,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      isCash: dto.isCash ?? false,
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
    };

    await this.purchasingRepository.create(invoiceData);

    for (let index = 0; index < dto.lines.length; index++) {
      const line = dto.lines[index];
      const detailId = await this.generateUniqueId(
        (did) => this.purchasingRepository.detailExists(did),
        'Unable to generate a unique primary key for Purchasing detail',
      );
      await this.purchasingRepository.createDetail({
        ...DEFAULT_INVOICE_DETAIL,
        id: detailId,
        invoiceId: id,
        stockId: line.stockId,
        code: line.stockCode?.toUpperCase() ?? null,
        unit: line.unit ?? null,
        qtyIn: line.qty,
        zQtyIn: line.qty,
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

    return this.findOne(id);
  }

  async update(id: string, dto: CreatePurchasingDto): Promise<PurchasingResponseDto> {
    const existing = await this.purchasingRepository.findOne(id);
    if (!existing) throw new NotFoundException(`Purchasing invoice ${id} not found`);

    const invoiceData: Partial<Invoice> = {
      refNo: dto.invoiceNo.toUpperCase(),
      date: new Date(dto.date),
      entityId: dto.supplierId,
      warehouseId: dto.warehouseId,
      exchangeId: dto.currencyId ?? CURRENCY_DEFAULT,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      isCash: dto.isCash ?? false,
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
    };

    await this.purchasingRepository.update(id, invoiceData);
    await this.purchasingRepository.deleteDetailsByInvoiceId(id);

    for (let index = 0; index < dto.lines.length; index++) {
      const line = dto.lines[index];
      const detailId = await this.generateUniqueId(
        (did) => this.purchasingRepository.detailExists(did),
        'Unable to generate a unique primary key for Purchasing detail',
      );
      await this.purchasingRepository.createDetail({
        ...DEFAULT_INVOICE_DETAIL,
        id: detailId,
        invoiceId: id,
        stockId: line.stockId,
        code: line.stockCode?.toUpperCase() ?? null,
        unit: line.unit ?? null,
        qtyIn: line.qty,
        zQtyIn: line.qty,
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

    return this.findOne(id);
  }

  async remove(id: string): Promise<void> {
    const existing = await this.purchasingRepository.findOne(id);
    if (!existing) throw new NotFoundException(`Purchasing invoice ${id} not found`);
    await this.purchasingRepository.deleteDetailsByInvoiceId(id);
    await this.purchasingRepository.delete(id);
  }
}
