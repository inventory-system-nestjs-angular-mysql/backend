import { Injectable, Inject, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { IGoodsTransferRepository, GOODS_TRANSFER_REPOSITORY } from '../../../../core/goods-transfer/repositories/goods-transfer.repository.interface';
import { WarehouseTypeOrmEntity } from '../../warehouse/entities/warehouse-typeorm.entity';
import { CurrencyTypeOrmEntity } from '../../currency/entities/currency-typeorm.entity';
import { StockTypeOrmEntity } from '../../stock/entities/stock-typeorm.entity';
import { CreateGoodsTransferDto } from '../../../../presentation/goods-transfer/dto/create-goods-transfer.dto';
import { GoodsTransferResponseDto, GoodsTransferLineResponseDto } from '../../../../presentation/goods-transfer/dto/goods-transfer-response.dto';
import { BaseService } from '../../../../core/services/base.service';
import { Invoice } from '../../../../core/invoice/entities/invoice.entity';
import { DEFAULT_INVOICE, DEFAULT_INVOICE_DETAIL } from '../../../../core/invoice/defaults/invoice.defaults';

const TRANSFER_SPECIAL = 'PD';
const CURRENCY_DEFAULT = '..rupiah...............';
const SALESMAN_DEFAULT = '..default..............';

@Injectable()
export class GoodsTransferService extends BaseService {
  constructor(
    @Inject(GOODS_TRANSFER_REPOSITORY)
    private readonly goodsTransferRepository: IGoodsTransferRepository,
    @InjectRepository(WarehouseTypeOrmEntity)
    private readonly warehouseRepo: Repository<WarehouseTypeOrmEntity>,
    @InjectRepository(CurrencyTypeOrmEntity)
    private readonly currencyRepo: Repository<CurrencyTypeOrmEntity>,
    @InjectRepository(StockTypeOrmEntity)
    private readonly stockRepo: Repository<StockTypeOrmEntity>,
  ) {
    super();
  }

  async findAll(): Promise<GoodsTransferResponseDto[]> {
    const invoices = await this.goodsTransferRepository.findAll();
    if (!invoices.length) return [];

    const ids = invoices.map((i) => i.id);
    const amountMap = await this.goodsTransferRepository.sumAmountsByInvoiceIds(ids);

    const fromWarehouseIds = [...new Set(invoices.map((i) => i.transfer).filter(Boolean))];
    const toWarehouseIds = [...new Set(invoices.map((i) => i.warehouseId).filter(Boolean))];
    const allWarehouseIds = [...new Set([...fromWarehouseIds, ...toWarehouseIds])];
    const currencyIds = [...new Set(invoices.map((i) => i.exchangeId).filter(Boolean))];

    const [warehouses, currencies] = await Promise.all([
      allWarehouseIds.length ? this.warehouseRepo.find({ where: { cWHSpk: In(allWarehouseIds) } }) : [],
      currencyIds.length ? this.currencyRepo.find({ where: { cEXCpk: In(currencyIds) } }) : [],
    ]);

    const warehouseMap = new Map<string, string>(warehouses.map((w) => [w.cWHSpk, w.cWHSdesc ?? ''] as [string, string]));
    const currencyMap = new Map<string, string>(currencies.map((c) => [c.cEXCpk, c.cEXCdesc ?? ''] as [string, string]));

    return invoices.map((inv) => ({
      id: inv.id,
      invoiceNo: inv.refNo,
      date: inv.date,
      dueDate: inv.dueDate,
      fromWarehouseId: inv.transfer,
      fromWarehouseName: warehouseMap.get(inv.transfer) ?? null,
      toWarehouseId: inv.warehouseId,
      toWarehouseName: warehouseMap.get(inv.warehouseId) ?? null,
      currencyId: inv.exchangeId,
      currencyName: currencyMap.get(inv.exchangeId) ?? null,
      discount1: inv.discount1,
      discount2: inv.discount2,
      discount3: inv.discount3,
      discount: inv.discount,
      freight: inv.freight,
      freightPct: inv.persen,
      tax: inv.tax,
      remark: inv.remark,
      sj: inv.sj,
      tglSj: inv.tglSj,
      scan1: inv.scan1,
      scan2: inv.scan2,
      scan3: inv.scan3,
      scan4: inv.scan4,
      totalAmount: amountMap.get(inv.id) ?? 0,
    }));
  }

  async findOne(id: string): Promise<GoodsTransferResponseDto> {
    const invoice = await this.goodsTransferRepository.findOne(id);
    if (!invoice) throw new NotFoundException(`Goods Transfer ${id} not found`);

    const details = await this.goodsTransferRepository.findDetailsByInvoiceId(id);

    const allWarehouseIds = [invoice.transfer, invoice.warehouseId].filter(Boolean);
    const [warehouses, currencyEntity] = await Promise.all([
      allWarehouseIds.length ? this.warehouseRepo.find({ where: { cWHSpk: In(allWarehouseIds) } }) : [],
      invoice.exchangeId ? this.currencyRepo.findOne({ where: { cEXCpk: invoice.exchangeId } }) : null,
    ]);
    const warehouseMap = new Map<string, string>(warehouses.map((w) => [w.cWHSpk, w.cWHSdesc ?? ''] as [string, string]));

    const stockIds = [...new Set(details.map((d) => d.stockId).filter(Boolean))];
    const stocks = stockIds.length ? await this.stockRepo.find({ where: { cSTKpk: In(stockIds) } }) : [];
    const stockMap = new Map(stocks.map((s) => [s.cSTKpk, s.cSTKdesc]));

    const lines: GoodsTransferLineResponseDto[] = details.map((d) => ({
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
      fromWarehouseId: invoice.transfer,
      fromWarehouseName: warehouseMap.get(invoice.transfer) ?? null,
      toWarehouseId: invoice.warehouseId,
      toWarehouseName: warehouseMap.get(invoice.warehouseId) ?? null,
      currencyId: invoice.exchangeId,
      currencyName: currencyEntity?.cEXCdesc ?? null,
      discount1: invoice.discount1,
      discount2: invoice.discount2,
      discount3: invoice.discount3,
      discount: invoice.discount,
      freight: invoice.freight,
      freightPct: invoice.persen,
      tax: invoice.tax,
      remark: invoice.remark,
      sj: invoice.sj,
      tglSj: invoice.tglSj,
      scan1: invoice.scan1,
      scan2: invoice.scan2,
      scan3: invoice.scan3,
      scan4: invoice.scan4,
      totalAmount: lines.reduce((sum, l) => sum + (l.amount ?? 0), 0),
      lines,
    };
  }

  async create(dto: CreateGoodsTransferDto): Promise<GoodsTransferResponseDto> {
    if (dto.fromWarehouseId === dto.toWarehouseId) {
      throw new BadRequestException('From and To locations cannot be the same.');
    }
    const id = await this.generateUniqueId(
      (id) => this.goodsTransferRepository.exists(id),
      'Unable to generate a unique primary key for Goods Transfer',
    );

    const invoiceData: Partial<Invoice> = {
      ...DEFAULT_INVOICE,
      id,
      special: TRANSFER_SPECIAL,
      refNo: dto.invoiceNo.toUpperCase(),
      date: new Date(dto.date),
      warehouseId: dto.toWarehouseId,
      transfer: dto.fromWarehouseId,
      exchangeId: dto.currencyId ?? CURRENCY_DEFAULT,
      salesmanId: SALESMAN_DEFAULT,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      discount1: dto.discount1 ?? 0,
      discount2: dto.discount2 ?? 0,
      discount3: dto.discount3 ?? 0,
      discount: dto.discount ?? 0,
      freight: dto.freight ?? 0,
      persen: dto.freightPct ?? 0,
      tax: dto.tax ?? 0,
      remark: dto.remark ?? ' ',
      sj: dto.sj ?? '',
      tglSj: dto.tglSj ? new Date(dto.tglSj) : null,
      scan1: dto.scan1 ?? '',
      scan2: dto.scan2 ?? '',
      scan3: dto.scan3 ?? '',
      scan4: dto.scan4 ?? '',
    };

    await this.goodsTransferRepository.create(invoiceData);

    for (let index = 0; index < dto.lines.length; index++) {
      const line = dto.lines[index];
      const detailId = await this.generateUniqueId(
        (did) => this.goodsTransferRepository.detailExists(did),
        'Unable to generate a unique primary key for Goods Transfer detail',
      );
      await this.goodsTransferRepository.createDetail({
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

  async update(id: string, dto: CreateGoodsTransferDto): Promise<GoodsTransferResponseDto> {
    if (dto.fromWarehouseId === dto.toWarehouseId) {
      throw new BadRequestException('From and To locations cannot be the same.');
    }
    const existing = await this.goodsTransferRepository.findOne(id);
    if (!existing) throw new NotFoundException(`Goods Transfer ${id} not found`);

    const invoiceData: Partial<Invoice> = {
      refNo: dto.invoiceNo.toUpperCase(),
      date: new Date(dto.date),
      warehouseId: dto.toWarehouseId,
      transfer: dto.fromWarehouseId,
      exchangeId: dto.currencyId ?? CURRENCY_DEFAULT,
      dueDate: dto.dueDate ? new Date(dto.dueDate) : null,
      discount1: dto.discount1 ?? 0,
      discount2: dto.discount2 ?? 0,
      discount3: dto.discount3 ?? 0,
      discount: dto.discount ?? 0,
      freight: dto.freight ?? 0,
      persen: dto.freightPct ?? 0,
      tax: dto.tax ?? 0,
      remark: dto.remark ?? ' ',
      sj: dto.sj ?? '',
      tglSj: dto.tglSj ? new Date(dto.tglSj) : null,
      scan1: dto.scan1 ?? '',
      scan2: dto.scan2 ?? '',
      scan3: dto.scan3 ?? '',
      scan4: dto.scan4 ?? '',
    };

    await this.goodsTransferRepository.update(id, invoiceData);
    await this.goodsTransferRepository.deleteDetailsByInvoiceId(id);

    for (let index = 0; index < dto.lines.length; index++) {
      const line = dto.lines[index];
      const detailId = await this.generateUniqueId(
        (did) => this.goodsTransferRepository.detailExists(did),
        'Unable to generate a unique primary key for Goods Transfer detail',
      );
      await this.goodsTransferRepository.createDetail({
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
    const existing = await this.goodsTransferRepository.findOne(id);
    if (!existing) throw new NotFoundException(`Goods Transfer ${id} not found`);
    await this.goodsTransferRepository.deleteDetailsByInvoiceId(id);
    await this.goodsTransferRepository.delete(id);
  }
}
