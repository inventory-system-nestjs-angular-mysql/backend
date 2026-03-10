import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { IInvoiceRepository } from '../../../../core/invoice/repositories/invoice.repository.interface';
import { IInvoiceDetailRepository } from '../../../../core/invoice/repositories/invoice-detail.repository.interface';
import { INVOICE_REPOSITORY, INVOICE_DETAIL_REPOSITORY } from '../../../../core/invoice/repositories/repository.tokens';
import { IStockDetailRepository } from '../../../../core/stock/repositories/stock-detail.repository.interface';
import { STOCK_DETAIL_REPOSITORY } from '../../../../core/stock/repositories/repository.tokens';
import { EntityTypeOrmEntity } from '../../entity/entities/entity-typeorm.entity';
import { UnitTypeOrmEntity } from '../../unit/entities/unit-typeorm.entity';
import { CurrencyTypeOrmEntity } from '../../currency/entities/currency-typeorm.entity';
import { StockTypeOrmEntity } from '../../stock/entities/stock-typeorm.entity';
import { Invoice } from '../../../../core/invoice/entities/invoice.entity';
import { InvoiceResponseDto } from '../../../../presentation/invoice/dto/invoice-response.dto';
import { CreateInvoiceDto } from '../../../../presentation/invoice/dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../../../../presentation/invoice/dto/update-invoice.dto';
import { CreateStockOpeningBalanceDto } from '../../../../presentation/invoice/dto/create-stock-opening-balance.dto';
import { OpeningBalanceDetailDto } from '../../../../presentation/invoice/dto/opening-balance-detail.dto';
import { BaseService } from '../../../../core/services/base.service';

const ENTITY_PK_OPENING = '..awal.................';
const SALESMAN_ID_DEFAULT = '..default..............';

@Injectable()
export class InvoiceService extends BaseService {
  constructor(
    @Inject(INVOICE_REPOSITORY)
    private readonly invoiceRepository: IInvoiceRepository,
    @Inject(INVOICE_DETAIL_REPOSITORY)
    private readonly invoiceDetailRepository: IInvoiceDetailRepository,
    @Inject(STOCK_DETAIL_REPOSITORY)
    private readonly stockDetailRepository: IStockDetailRepository,
    @InjectRepository(EntityTypeOrmEntity)
    private readonly entityRepository: Repository<EntityTypeOrmEntity>,
    @InjectRepository(UnitTypeOrmEntity)
    private readonly unitRepository: Repository<UnitTypeOrmEntity>,
    @InjectRepository(CurrencyTypeOrmEntity)
    private readonly currencyRepository: Repository<CurrencyTypeOrmEntity>,
    @InjectRepository(StockTypeOrmEntity)
    private readonly stockRepository: Repository<StockTypeOrmEntity>,
  ) {
    super();
  }

  async findByCustomerId(customerId: string): Promise<InvoiceResponseDto[]> {
    if (!customerId || !customerId.trim()) {
      return [];
    }
    const trimmedCustomerId = customerId.trim();
    const invoices = await this.invoiceRepository.findByEntityId(trimmedCustomerId, 'SA');
    return invoices.map((invoice) => this.mapToResponseDto(invoice));
  }

  async findBySupplierId(supplierId: string): Promise<InvoiceResponseDto[]> {
    // Get purchasing invoices (BL) for the supplier
    // Ensure supplierId is valid and trim any whitespace
    if (!supplierId || !supplierId.trim()) {
      return [];
    }
    const trimmedSupplierId = supplierId.trim();
    const invoices = await this.invoiceRepository.findByEntityId(trimmedSupplierId, 'SA');
    return invoices.map((invoice) => this.mapToResponseDto(invoice));
  }

  async create(createInvoiceDto: CreateInvoiceDto): Promise<InvoiceResponseDto> {

    const id = await this.generateUniqueId(
      (id) => this.invoiceRepository.exists(id),
      'Unable to generate a unique primary key for Invoice',
    );

    // Required fields are validated by DTO, so we can safely use them
    const invoiceValue = createInvoiceDto.value;

    const invoicePartial: Partial<Invoice> = {
      id,
      refNo: createInvoiceDto.refNo,
      date: new Date(createInvoiceDto.date),
      entityId: createInvoiceDto.entityId || null, // Use || to handle empty strings as well
      salesmanId: createInvoiceDto.salesmanId ?? '..default..............', // Default: '..default..............'
      warehouseId: createInvoiceDto.warehouseId,
      exchangeId: createInvoiceDto.exchangeId ?? '..rupiah...............', // Default: '..rupiah...............'
      isCash: createInvoiceDto.isCash ?? false, // Default: 0 (false)
      dueDate: createInvoiceDto.dueDate ? new Date(createInvoiceDto.dueDate) : null,
      special: createInvoiceDto.special ?? null,
      remark: createInvoiceDto.remark ?? ' ', // Default: ' '
      value: invoiceValue,
      opening: createInvoiceDto.opening ?? 0, // Default: 0.0
      // Set default values for fields with database defaults
      serie: ' ', // Default: ' '
      taxInvoice: ' ', // Default: ' '
      po: ' ', // Default: ' '
      remark1: ' ', // Default: ' '
      returnTo: '', // Default: ''
      transfer: 'n/a', // Default: 'n/a'
      // Set default values for opening balance invoices
      piutang: invoiceValue, // Total amount owed
      tunai: 0, // Default: 0.0
      credit: 0, // Default: 0.0
      debit: 0, // Default: 0.0
      isPaid: false, // Default: 0 (false)
      discount: 0, // Default: 0.0
      discount1: 0, // Default: 0.0
      discount2: 0, // Default: 0.0
      discount3: 0, // Default: 0.0
      tax: 0, // Default: 0.0
      freight: 0, // Default: 0.0
      option: 0, // Default: 0
      cetak: 0, // Default: 0
      dp: 0, // Default: 0.0
      voucher: 0, // Default: 0.0
      jam: 0, // Default: 0
      noCard: ' ', // Default: ' '
      jenisCard: ' ', // Default: ' '
      ccardNama: ' ', // Default: ' '
      ccardOto: ' ', // Default: ' '
      ccardNilai: 0, // Default: 0.0
      kembali: 0, // Default: 0.0
      serialNumber: null, // serino - nullable, no default
      xkirim: 0, // Default: 0
      kunci: 0, // Default: 0
      oleh: null, // nullable, no default
      point: 0, // Default: 0
      pax: 0, // Default: 0
      dine: ' ', // Default: ' '
      postransfer: 0, // Default: 0
      hadiah: null, // nullable, no default
      meja: ' ', // Default: ' '
      mobileId: ' ', // Default: ' '
      promoValue: 0, // Default: 0.0
      promoDiscount: 0, // Default: 0.0
      promoSales: 0, // Default: 0.0
      sedan: ' ', // Default: ' '
      km: 0, // Default: 0
      sedanCode: ' ', // Default: ' '
      pawal: 0, // Default: 0
      okirim: null, // nullable, no default
      rate: 1.0, // Default: 1.0
      ivdTime: null, // nullable, no default
      cetak1: 0, // Default: 0
      clientId: ' ', // Default: ' '
      posId: ' ', // Default: ' '
      camId: ' ', // Default: ' '
      promog: ' ', // Default: ' '
      waste: 0, // Default: 0.0
      gratis: 0, // Default: 0.0
      sj: '', // Default: ''
      tglSj: null,
      pilih: 0, // Default: 0
      value1: 0, // Default: 0.0
      ratep: 1.0, // Default: 1.0
      epajak: null, // nullable, no default
      persen: 0, // Default: 0.0
      mobile: 0, // Default: 0.0
      fg: 0, // Default: 0
      poAmount: 0, // Default: 0.0
      expire: 0, // Default: 0
      app: 0, // Default: 0
      zap: 0, // Default: 0
      lain: '', // Default: ''
      scan1: '', // Default: ''
      scan2: '', // Default: ''
      scan3: '', // Default: ''
      scan4: '', // Default: ''
      inv12: 1, // Default: 1
      canvas: '01', // Default: '01'
      tambah: '', // Default: ''
      fee: 0, // Default: 0.0
      kode: '04', // Default: '04'
      cap: '', // Default: ''
      ket: '', // Default: ''
      jasa: 'A', // Default: 'A'
      tidak: 0, // Default: 0
      namapc: '', // Default: ''
    };

    const invoice = await this.invoiceRepository.create(invoicePartial);
    return this.mapToResponseDto(invoice);
  }

  /**
   * Create a Stock Opening Balance: one invoice with entityId = '..awal.................'
   * and salesmanId = '..default..............', plus invoice detail lines for each stock.
   */
  async createStockOpeningBalance(
    dto: CreateStockOpeningBalanceDto,
  ): Promise<InvoiceResponseDto> {
    const invoiceId = await this.generateUniqueId(
      (id) => this.invoiceRepository.exists(id),
      'Unable to generate a unique primary key for Invoice',
    );

    const invoiceDate = new Date(dto.date);

    const now = new Date();
    const olehTimestamp = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const openingEntity = await this.entityRepository.findOne({ where: { cENTpk: ENTITY_PK_OPENING } });
    const openingEntityCode = openingEntity?.cENTcode ?? null;

    const currencyRecord = await this.currencyRepository.findOne({ where: { cEXCpk: dto.currencyId } });
    const currencyRate = currencyRecord ? Number(currencyRecord.nEXCvalue) : 1.0;

    const invoicePartial: Partial<Invoice> = {
      id: invoiceId,
      refNo: dto.refNo?.toUpperCase(),
      date: invoiceDate,
      entityId: ENTITY_PK_OPENING,
      entityCode: openingEntityCode,
      salesmanId: SALESMAN_ID_DEFAULT,
      warehouseId: dto.warehouseId,
      exchangeId: dto.currencyId,
      isCash: false,
      dueDate: invoiceDate,
      taxDate: invoiceDate,
      special: 'SA',
      remark: dto.remark ?? ' ',
      value: 0,
      opening: 0,
      rate: currencyRate,
      oleh: olehTimestamp,
      serie: ' ',
      taxInvoice: ' ',
      po: ' ',
      remark1: ' ',
      returnTo: '',
      transfer: 'n/a',
      piutang: 0,
      tunai: 0,
      credit: 0,
      debit: 0,
      isPaid: false,
      discount: 0,
      discount1: 0,
      discount2: 0,
      discount3: 0,
      tax: 0,
      freight: 0,
      option: 0,
      cetak: 0,
      dp: 0,
      voucher: 0,
      jam: 0,
      noCard: ' ',
      jenisCard: ' ',
      ccardNama: ' ',
      ccardOto: ' ',
      ccardNilai: 0,
      kembali: 0,
      serialNumber: null,
      xkirim: 0,
      kunci: 0,
      point: 0,
      pax: 0,
      dine: ' ',
      postransfer: 0,
      hadiah: null,
      meja: ' ',
      mobileId: ' ',
      promoValue: 0,
      promoDiscount: 0,
      promoSales: 0,
      sedan: ' ',
      km: 0,
      sedanCode: ' ',
      pawal: 0,
      okirim: null,
      ivdTime: null,
      cetak1: 0,
      clientId: ' ',
      posId: ' ',
      camId: ' ',
      promog: ' ',
      waste: 0,
      gratis: 0,
      sj: '',
      tglSj: new Date(),
      pilih: 0,
      value1: 0,
      ratep: 1.0,
      epajak: null,
      persen: 0,
      mobile: 0,
      fg: 0,
      poAmount: 0,
      expire: 0,
      app: 0,
      zap: 0,
      lain: '',
      scan1: '',
      scan2: '',
      scan3: '',
      scan4: '',
      inv12: 1,
      canvas: '01',
      tambah: '',
      fee: 0,
      kode: '04',
      cap: '',
      ket: '',
      jasa: 'A',
      tidak: 0,
      namapc: '',
    };

    const invoice = await this.invoiceRepository.create(invoicePartial);

    for (let order = 0; order < dto.lines.length; order++) {
      const line = dto.lines[order];
      const stockDetail = await this.stockDetailRepository.findOne(
        line.stockDetailId,
      );
      if (!stockDetail) {
        throw new NotFoundException(
          `Stock detail with id '${line.stockDetailId}' not found`,
        );
      }
      const detailId = await this.generateUniqueId(
        (id) => this.invoiceDetailRepository.exists(id),
        'Unable to generate a unique primary key for Invoice Detail',
      );
      const unitRecord = stockDetail.unitId
        ? await this.unitRepository.findOne({ where: { cUNIpk: stockDetail.unitId } })
        : null;
      const unitName = unitRecord?.cUNIdesc ?? stockDetail.unit ?? 'def';
      const qty = line.qty ?? 0;
      const factor = stockDetail.conversionFactor ?? 1;
      const onHand = await this.invoiceDetailRepository.getOnHandByStockId(stockDetail.stockId);

      const stock = await this.stockRepository.findOne({ where: { cSTKpk: stockDetail.stockId } });
      const basePrice = currencyRate === 1
        ? Number(stock?.nSTKbuy ?? 0)
        : Number(stock?.nSTKxbuy ?? 0);
      const computedPrice = basePrice * factor;
      const computedAmount = qty * computedPrice;

      await this.invoiceDetailRepository.create({
        id: detailId,
        invoiceId,
        stockId: stockDetail.stockId,
        qtyIn: qty,
        qtyOut: 0,
        zQtyIn: qty * factor,
        zQtyOut: 0,
        price: computedPrice,
        disc1: 0,
        disc2: 0,
        disc3: 0,
        disc: 0,
        accQty: 0,
        accEnt: 0,
        order,
        code: (line.stockCode ?? stockDetail.code ?? 'def').toUpperCase(),
        factor,
        ivdSplit: 0,
        unit: unitName,
        amount: computedAmount,
        accQtyTransfer: 0,
        onHand,
        adjust: 0,
        porderId: ' ',
        cost: 0,
        pokok: 0,
        stkppn: 1,
        serialNumber: null,
        xkirim: null,
        sn: null,
        memo: null,
        kirim: 1,
        id1: ' ',
        id2: ' ',
        id3: ' ',
        batch: ' ',
        expire: null,
        ven: 0,
        venp: 0,
        ven1: 0,
        venp1: 0,
        promoCard: null,
        inipromo: 0,
        resep: null,
        persen: 0,
        tgl: null,
        nota: null,
        po: 0,
        stockId1: null,
        qtyResep: 0,
        edit: 0,
        disct: null,
        pilih1: 0,
        pilih2: 0,
        discx: 0,
      });
    }

    return this.mapToResponseDto(invoice);
  }

  async createBulkForSupplier(
    supplierId: string,
    invoices: CreateInvoiceDto[],
  ): Promise<InvoiceResponseDto[]> {
    // Ensure supplierId is valid
    if (!supplierId || !supplierId.trim()) {
      throw new Error('Supplier ID is required');
    }
    const trimmedSupplierId = supplierId.trim();
    
    const resultInvoices: InvoiceResponseDto[] = [];


    for (const invoiceDto of invoices) {
      const invoiceValue = invoiceDto.value;
      const invoiceDate = invoiceDto.date instanceof Date ? invoiceDto.date : new Date(invoiceDto.date);
      const now = new Date();
      const olehTimestamp = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      const exchangeId = invoiceDto.exchangeId ?? '..rupiah...............';
      const currencyRecord = await this.currencyRepository.findOne({ where: { cEXCpk: exchangeId } });
      const currencyRate = currencyRecord ? Number(currencyRecord.nEXCvalue) : 1.0;

      const invoiceData: Partial<Invoice> = {
        refNo: invoiceDto.refNo?.toUpperCase(),
        date: invoiceDate,
        entityId: trimmedSupplierId,
        entityCode: invoiceDto.entityCode ?? null,
        salesmanId: invoiceDto.salesmanId ?? '..default..............',
        warehouseId: invoiceDto.warehouseId,
        exchangeId: exchangeId,
        isCash: invoiceDto.isCash ?? false,
        dueDate: invoiceDate, // due date = invoice date
        taxDate: invoiceDate, // tax date = invoice date
        special: 'SA',       // 'SA' = Saldo Awal (opening balance)
        remark: invoiceDto.remark ?? ' ',
        value: 0,            // amount goes into opening, not value
        opening: invoiceValue, // store the actual amount here
        rate: currencyRate,
        oleh: olehTimestamp,
        serie: ' ',
        taxInvoice: ' ',
        po: ' ',
        remark1: ' ',
        returnTo: '',
        transfer: 'n/a',
        piutang: 0,          // 0 for opening balance
        tunai: 0,
        credit: 0,
        debit: 0,
        isPaid: false,
        discount: 0,
        discount1: 0,
        discount2: 0,
        discount3: 0,
        tax: 0,
        freight: 0,
        option: 0,
        cetak: 0,
        dp: 0,
        voucher: 0,
        jam: 0,
        noCard: ' ',
        jenisCard: ' ',
        ccardNama: ' ',
        ccardOto: ' ',
        ccardNilai: 0,
        kembali: 0,
        serialNumber: null,
        xkirim: 0,
        kunci: 0,
        point: 0,
        pax: 0,
        dine: ' ',
        postransfer: 0,
        hadiah: null,
        meja: ' ',
        mobileId: ' ',
        promoValue: 0,
        promoDiscount: 0,
        promoSales: 0,
        sedan: ' ',
        km: 0,
        sedanCode: ' ',
        pawal: 0,
        okirim: null,
        ivdTime: null,
        cetak1: 0,
        clientId: ' ',
        posId: ' ',
        camId: ' ',
        promog: ' ',
        waste: 0,
        gratis: 0,
        sj: '',
        tglSj: null,
        pilih: 0,
        value1: 0,
        ratep: 1.0,
        epajak: null,
        persen: 0,
        mobile: 0,
        fg: 0,
        poAmount: 0,
        expire: 0,
        app: 0,
        zap: 0,
        lain: '',
        scan1: '',
        scan2: '',
        scan3: '',
        scan4: '',
        inv12: 1,
        canvas: '01',
        tambah: '',
        fee: 0,
        kode: '04',
        cap: '',
        ket: '',
        jasa: 'A',
        tidak: 0,
        namapc: '',
      };

      if (invoiceDto.id && invoiceDto.id.trim() !== '') {
        const existingInvoice = await this.invoiceRepository.findOne(invoiceDto.id.trim());
        if (existingInvoice) {
          const updated = await this.invoiceRepository.update(invoiceDto.id.trim(), invoiceData);
          resultInvoices.push(this.mapToResponseDto(updated));
          continue;
        }
      }

      // For new invoice, generate an id and save
      const id = await this.generateUniqueId(
        (id) => this.invoiceRepository.exists(id),
        'Unable to generate a unique primary key for Invoice',
      );
      invoiceData.id = id;
      const created = await this.invoiceRepository.create(invoiceData);
      resultInvoices.push(this.mapToResponseDto(created));
    }

    return resultInvoices;
  }

  async createBulkForCustomer(
    customerId: string,
    invoices: CreateInvoiceDto[],
  ): Promise<InvoiceResponseDto[]> {
    if (!customerId || !customerId.trim()) {
      throw new Error('Customer ID is required');
    }
    const trimmedCustomerId = customerId.trim();
    const resultInvoices: InvoiceResponseDto[] = [];

    for (const invoiceDto of invoices) {
      const invoiceValue = invoiceDto.value;
      const invoiceDate = invoiceDto.date instanceof Date ? invoiceDto.date : new Date(invoiceDto.date);
      const now = new Date();
      const olehTimestamp = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

      const exchangeId = invoiceDto.exchangeId ?? '..rupiah...............';
      const currencyRecord = await this.currencyRepository.findOne({ where: { cEXCpk: exchangeId } });
      const currencyRate = currencyRecord ? Number(currencyRecord.nEXCvalue) : 1.0;

      const invoiceData: Partial<Invoice> = {
        refNo: invoiceDto.refNo?.toUpperCase(),
        date: invoiceDate,
        entityId: trimmedCustomerId,
        entityCode: invoiceDto.entityCode ?? null,
        salesmanId: invoiceDto.salesmanId ?? '..default..............',
        warehouseId: invoiceDto.warehouseId,
        exchangeId: exchangeId,
        isCash: invoiceDto.isCash ?? false,
        dueDate: invoiceDate, // due date = invoice date
        taxDate: invoiceDate, // tax date = invoice date
        special: 'SA',       // 'SA' = Saldo Awal (opening balance)
        remark: invoiceDto.remark ?? ' ',
        value: 0,            // amount goes into opening, not value
        opening: invoiceValue, // store the actual amount here
        rate: currencyRate,
        oleh: olehTimestamp,
        serie: ' ',
        taxInvoice: ' ',
        po: ' ',
        remark1: ' ',
        returnTo: '',
        transfer: 'n/a',
        piutang: 0,          // 0 for opening balance
        tunai: 0,
        credit: 0,
        debit: 0,
        isPaid: false,
        discount: 0,
        discount1: 0,
        discount2: 0,
        discount3: 0,
        tax: 0,
        freight: 0,
        option: 0,
        cetak: 0,
        dp: 0,
        voucher: 0,
        jam: 0,
        noCard: ' ',
        jenisCard: ' ',
        ccardNama: ' ',
        ccardOto: ' ',
        ccardNilai: 0,
        kembali: 0,
        serialNumber: null,
        xkirim: 0,
        kunci: 0,
        point: 0,
        pax: 0,
        dine: ' ',
        postransfer: 0,
        hadiah: null,
        meja: ' ',
        mobileId: ' ',
        promoValue: 0,
        promoDiscount: 0,
        promoSales: 0,
        sedan: ' ',
        km: 0,
        sedanCode: ' ',
        pawal: 0,
        okirim: null,
        ivdTime: null,
        cetak1: 0,
        clientId: ' ',
        posId: ' ',
        camId: ' ',
        promog: ' ',
        waste: 0,
        gratis: 0,
        sj: '',
        tglSj: null,
        pilih: 0,
        value1: 0,
        ratep: 1.0,
        epajak: null,
        persen: 0,
        mobile: 0,
        fg: 0,
        poAmount: 0,
        expire: 0,
        app: 0,
        zap: 0,
        lain: '',
        scan1: '',
        scan2: '',
        scan3: '',
        scan4: '',
        inv12: 1,
        canvas: '01',
        tambah: '',
        fee: 0,
        kode: '04',
        cap: '',
        ket: '',
        jasa: 'A',
        tidak: 0,
        namapc: '',
      };

      if (invoiceDto.id && invoiceDto.id.trim() !== '') {
        const existingInvoice = await this.invoiceRepository.findOne(invoiceDto.id.trim());
        if (existingInvoice) {
          const updated = await this.invoiceRepository.update(invoiceDto.id.trim(), invoiceData);
          resultInvoices.push(this.mapToResponseDto(updated));
          continue;
        }
      }

      const id = await this.generateUniqueId(
        (id) => this.invoiceRepository.exists(id),
        'Unable to generate a unique primary key for Invoice',
      );
      invoiceData.id = id;
      const created = await this.invoiceRepository.create(invoiceData);
      resultInvoices.push(this.mapToResponseDto(created));
    }

    return resultInvoices;
  }

  async findOpeningBalances(): Promise<InvoiceResponseDto[]> {
    const invoices = await this.invoiceRepository.findByEntityId(ENTITY_PK_OPENING, 'SA');
    const ids = invoices.map((i) => i.id);
    const amountMap = await this.invoiceDetailRepository.sumAmountsByInvoiceIds(ids);
    return invoices.map((invoice) => {
      const detailTotal = amountMap.get(invoice.id) ?? 0;
      return this.mapToResponseDto({ ...invoice, opening: detailTotal });
    });
  }

  async findOpeningBalanceDetail(id: string): Promise<OpeningBalanceDetailDto> {
    const invoice = await this.invoiceRepository.findOne(id);
    if (!invoice) {
      throw new NotFoundException(`Opening balance invoice with id '${id}' not found`);
    }
    const lines = await this.invoiceDetailRepository.findByInvoiceId(id);
    return {
      id: invoice.id,
      refNo: invoice.refNo,
      date: invoice.date,
      warehouseId: invoice.warehouseId,
      currencyId: invoice.exchangeId ?? '',
      remark: invoice.remark ?? null,
      amount: invoice.opening ?? 0,
      lines: await Promise.all(lines.map(async (line) => {
        const stockDetail = (line.stockId && line.code)
          ? await this.stockDetailRepository.findByStockIdAndCode(line.stockId, line.code)
          : null;
        return {
        stockDetailId: stockDetail?.id ?? '',
        stockCode: line.code ?? '',
        unit: line.unit ?? '',
        qty: line.qtyIn,
          purchasePrice: line.price,
          amount: line.amount ?? 0,
          onHand: line.onHand ?? 0,
        };
      })),
    };
  }

  async updateOpeningBalance(
    id: string,
    dto: CreateStockOpeningBalanceDto,
  ): Promise<InvoiceResponseDto> {
    const exists = await this.invoiceRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Opening balance invoice with id '${id}' not found`);
    }

    const invoiceDate = new Date(dto.date);

    const now = new Date();
    const olehTimestamp = `${now.getDate().toString().padStart(2, '0')}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getFullYear()} ${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    const openingEntity = await this.entityRepository.findOne({ where: { cENTpk: ENTITY_PK_OPENING } });
    const openingEntityCode = openingEntity?.cENTcode ?? null;

    const currencyRecord = await this.currencyRepository.findOne({ where: { cEXCpk: dto.currencyId } });
    const currencyRate = currencyRecord ? Number(currencyRecord.nEXCvalue) : 1.0;

    // Reuse the same field assignments as createStockOpeningBalance (refNo is intentionally excluded — invoice no. is immutable after creation)
    const invoicePartial: Partial<Invoice> = {
      date: invoiceDate,
      entityId: ENTITY_PK_OPENING,
      entityCode: openingEntityCode,
      salesmanId: SALESMAN_ID_DEFAULT,
      warehouseId: dto.warehouseId,
      exchangeId: dto.currencyId,
      isCash: false,
      dueDate: invoiceDate,
      taxDate: invoiceDate,
      special: 'SA',
      remark: dto.remark ?? ' ',
      value: 0,
      opening: 0,
      rate: currencyRate,
      oleh: olehTimestamp,
      serie: ' ',
      taxInvoice: ' ',
      po: ' ',
      remark1: ' ',
      returnTo: '',
      transfer: 'n/a',
      piutang: 0,
      tunai: 0,
      credit: 0,
      debit: 0,
      isPaid: false,
      discount: 0,
      discount1: 0,
      discount2: 0,
      discount3: 0,
      tax: 0,
      freight: 0,
      option: 0,
      cetak: 0,
      dp: 0,
      voucher: 0,
      jam: 0,
      noCard: ' ',
      jenisCard: ' ',
      ccardNama: ' ',
      ccardOto: ' ',
      ccardNilai: 0,
      kembali: 0,
      serialNumber: null,
      xkirim: 0,
      kunci: 0,
      point: 0,
      pax: 0,
      dine: ' ',
      postransfer: 0,
      hadiah: null,
      meja: ' ',
      mobileId: ' ',
      promoValue: 0,
      promoDiscount: 0,
      promoSales: 0,
      sedan: ' ',
      km: 0,
      sedanCode: ' ',
      pawal: 0,
      okirim: null,
      ivdTime: null,
      cetak1: 0,
      clientId: ' ',
      posId: ' ',
      camId: ' ',
      promog: ' ',
      waste: 0,
      gratis: 0,
      sj: '',
      tglSj: new Date(),
      pilih: 0,
      value1: 0,
      ratep: 1.0,
      epajak: null,
      persen: 0,
      mobile: 0,
      fg: 0,
      poAmount: 0,
      expire: 0,
      app: 0,
      zap: 0,
      lain: '',
      scan1: '',
      scan2: '',
      scan3: '',
      scan4: '',
      inv12: 1,
      canvas: '01',
      tambah: '',
      fee: 0,
      kode: '04',
      cap: '',
      ket: '',
      jasa: 'A',
      tidak: 0,
      namapc: '',
    };

    await this.invoiceRepository.update(id, invoicePartial);

    await this.invoiceDetailRepository.deleteByInvoiceId(id);

    for (let order = 0; order < dto.lines.length; order++) {
      const line = dto.lines[order];
      const stockDetail = await this.stockDetailRepository.findOne(line.stockDetailId);
      if (!stockDetail) {
        throw new NotFoundException(
          `Stock detail with id '${line.stockDetailId}' not found`,
        );
      }
      const detailId = await this.generateUniqueId(
        (detId) => this.invoiceDetailRepository.exists(detId),
        'Unable to generate a unique primary key for Invoice Detail',
      );
      const unitRecord = stockDetail.unitId
        ? await this.unitRepository.findOne({ where: { cUNIpk: stockDetail.unitId } })
        : null;
      const unitName = unitRecord?.cUNIdesc ?? stockDetail.unit ?? 'def';
      const qty = line.qty ?? 0;
      const factor = stockDetail.conversionFactor ?? 1;
      const onHand = await this.invoiceDetailRepository.getOnHandByStockId(stockDetail.stockId);

      const stock = await this.stockRepository.findOne({ where: { cSTKpk: stockDetail.stockId } });
      const basePrice = currencyRate === 1
        ? Number(stock?.nSTKbuy ?? 0)
        : Number(stock?.nSTKxbuy ?? 0);
      const computedPrice = basePrice * factor;
      const computedAmount = qty * computedPrice;

      await this.invoiceDetailRepository.create({
        id: detailId,
        invoiceId: id,
        stockId: stockDetail.stockId,
        qtyIn: qty,
        qtyOut: 0,
        zQtyIn: qty * factor,
        zQtyOut: 0,
        price: computedPrice,
        disc1: 0,
        disc2: 0,
        disc3: 0,
        disc: 0,
        accQty: 0,
        accEnt: 0,
        order,
        code: (line.stockCode ?? stockDetail.code ?? 'def').toUpperCase(),
        factor,
        ivdSplit: 0,
        unit: unitName,
        amount: computedAmount,
        accQtyTransfer: 0,
        onHand,
        adjust: 0,
        porderId: ' ',
        cost: 0,
        pokok: 0,
        stkppn: 1,
        serialNumber: null,
        xkirim: null,
        sn: null,
        memo: null,
        kirim: 1,
        id1: ' ',
        id2: ' ',
        id3: ' ',
        batch: ' ',
        expire: null,
        ven: 0,
        venp: 0,
        ven1: 0,
        venp1: 0,
        promoCard: null,
        inipromo: 0,
        resep: null,
        persen: 0,
        tgl: null,
        nota: null,
        po: 0,
        stockId1: null,
        qtyResep: 0,
        edit: 0,
        disct: null,
        pilih1: 0,
        pilih2: 0,
        discx: 0,
      });
    }

    const updated = await this.invoiceRepository.findOne(id);
    return this.mapToResponseDto(updated!);
  }

  async getOnHandByStockId(stockId: string): Promise<number> {
    return this.invoiceDetailRepository.getOnHandByStockId(stockId);
  }

  async findAll(): Promise<InvoiceResponseDto[]> {
    const invoices = await this.invoiceRepository.findAll();
    return invoices.map((invoice) => this.mapToResponseDto(invoice));
  }

  async findOne(id: string): Promise<InvoiceResponseDto> {
    const invoice = await this.invoiceRepository.findOne(id);
    if (!invoice) {
      throw new NotFoundException(`Invoice with id '${id}' not found`);
    }
    return this.mapToResponseDto(invoice);
  }

  async update(
    id: string,
    updateInvoiceDto: UpdateInvoiceDto,
  ): Promise<InvoiceResponseDto> {
    const exists = await this.invoiceRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Invoice with id '${id}' not found`);
    }

    const updateData: Partial<Invoice> = {
      ...(updateInvoiceDto.refNo !== undefined && { refNo: updateInvoiceDto.refNo }),
      ...(updateInvoiceDto.date !== undefined && { date: updateInvoiceDto.date instanceof Date ? updateInvoiceDto.date : new Date(updateInvoiceDto.date) }),
      ...(updateInvoiceDto.entityId !== undefined && { entityId: updateInvoiceDto.entityId }),
      ...(updateInvoiceDto.salesmanId !== undefined && { salesmanId: updateInvoiceDto.salesmanId }),
      ...(updateInvoiceDto.warehouseId !== undefined && { warehouseId: updateInvoiceDto.warehouseId }),
      ...(updateInvoiceDto.exchangeId !== undefined && { exchangeId: updateInvoiceDto.exchangeId }),
      ...(updateInvoiceDto.isCash !== undefined && { isCash: updateInvoiceDto.isCash }),
      ...(updateInvoiceDto.dueDate !== undefined && { dueDate: updateInvoiceDto.dueDate ? (updateInvoiceDto.dueDate instanceof Date ? updateInvoiceDto.dueDate : new Date(updateInvoiceDto.dueDate)) : null }),
      ...(updateInvoiceDto.special !== undefined && { special: updateInvoiceDto.special }),
      ...(updateInvoiceDto.value !== undefined && { value: updateInvoiceDto.value }),
      ...(updateInvoiceDto.remark !== undefined && { remark: updateInvoiceDto.remark }),
    };

    const updated = await this.invoiceRepository.update(id, updateData);
    return this.mapToResponseDto(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.invoiceRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Invoice with id '${id}' not found`);
    }
    await this.invoiceRepository.delete(id);
  }

  private mapToResponseDto(invoice: Invoice): InvoiceResponseDto {
    // For SA (opening balance) invoices, amount is stored in opening field; value is 0
    const amount = invoice.special === 'SA' ? (invoice.opening || 0) : (invoice.value || 0);
    // Calculate remaining amount (piutang - paid amounts)
    const rem = invoice.isPaid ? 0 : (invoice.piutang - invoice.tunai - invoice.credit - invoice.debit);

    return {
      id: invoice.id,
      invoice: invoice.refNo || invoice.id,
      date: invoice.date || new Date(),
      warehouse: invoice.warehouseId || '',
      currency: invoice.exchangeId || '',
      amount,
      remark: invoice.remark || null,
      rem: rem > 0 ? rem : null,
    };
  }
}

