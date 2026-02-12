import {
  Injectable,
  NotFoundException,
  Inject,
} from '@nestjs/common';
import { IInvoiceRepository } from '../../../../core/invoice/repositories/invoice.repository.interface';
import { IInvoiceDetailRepository } from '../../../../core/invoice/repositories/invoice-detail.repository.interface';
import { INVOICE_REPOSITORY, INVOICE_DETAIL_REPOSITORY } from '../../../../core/invoice/repositories/repository.tokens';
import { Invoice } from '../../../../core/invoice/entities/invoice.entity';
import { InvoiceResponseDto } from '../../../../presentation/invoice/dto/invoice-response.dto';
import { CreateInvoiceDto } from '../../../../presentation/invoice/dto/create-invoice.dto';
import { UpdateInvoiceDto } from '../../../../presentation/invoice/dto/update-invoice.dto';
import { CreateStockOpeningBalanceDto } from '../../../../presentation/invoice/dto/create-stock-opening-balance.dto';
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
  ) {
    super();
  }

  async findByCustomerId(customerId: string): Promise<InvoiceResponseDto[]> {
    if (!customerId || !customerId.trim()) {
      return [];
    }
    const trimmedCustomerId = customerId.trim();
    const invoices = await this.invoiceRepository.findByEntityId(trimmedCustomerId, 'JL');
    return invoices.map((invoice) => this.mapToResponseDto(invoice));
  }

  async findBySupplierId(supplierId: string): Promise<InvoiceResponseDto[]> {
    // Get purchasing invoices (BL) for the supplier
    // Ensure supplierId is valid and trim any whitespace
    if (!supplierId || !supplierId.trim()) {
      return [];
    }
    const trimmedSupplierId = supplierId.trim();
    const invoices = await this.invoiceRepository.findByEntityId(trimmedSupplierId, 'BL');
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
      tglSj: null, // nullable, no default
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

    const totalValue = dto.lines.reduce((sum, line) => sum + line.amount, 0);
    const invoiceDate = new Date(dto.date);

    const invoicePartial: Partial<Invoice> = {
      id: invoiceId,
      refNo: dto.refNo,
      date: invoiceDate,
      entityId: ENTITY_PK_OPENING,
      salesmanId: SALESMAN_ID_DEFAULT,
      warehouseId: dto.warehouseId,
      exchangeId: '..rupiah...............',
      isCash: false,
      dueDate: null,
      special: 'BL',
      remark: dto.remark ?? ' ',
      value: totalValue,
      opening: 1,
      serie: ' ',
      taxInvoice: ' ',
      po: ' ',
      remark1: ' ',
      returnTo: '',
      transfer: 'n/a',
      piutang: totalValue,
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
      oleh: null,
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
      rate: 1.0,
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

    const invoice = await this.invoiceRepository.create(invoicePartial);

    for (let order = 0; order < dto.lines.length; order++) {
      const line = dto.lines[order];
      const detailId = await this.generateUniqueId(
        (id) => this.invoiceDetailRepository.exists(id),
        'Unable to generate a unique primary key for Invoice Detail',
      );
      await this.invoiceDetailRepository.create({
        id: detailId,
        invoiceId,
        stockId: line.stockId ?? 'def', // default: 'def'
        qtyIn: line.qty ?? 0,
        qtyOut: 0,
        zQtyIn: 0,
        zQtyOut: 0,
        price: line.purchasePrice ?? 0,
        disc1: 0,
        disc2: 0,
        disc3: 0,
        disc: 0,
        accQty: 0,
        accEnt: 0,
        order,
        code: line.stockCode ?? 'def', // default: 'def'
        factor: 0,
        ivdSplit: 0,
        unit: line.unit ?? 'def', // default: 'def'
        amount: line.amount ?? null,
        accQtyTransfer: 0,
        onHand: 0,
        adjust: 0,
        porderId: ' ', // default: '' but using ' ' for clarity
        cost: 0,
        pokok: line.purchasePrice ?? 0,
        stkppn: 0,
        serialNumber: null,
        xkirim: null,
        sn: null,
        memo: null,
        kirim: 1,
        id1: ' ', // default: ' '
        id2: ' ', // default: ' '
        id3: ' ', // default: ' '
        batch: ' ', // default: ' '
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
      // Build the full invoice object with all defaults
      const invoiceData: Partial<Invoice> = {
        refNo: invoiceDto.refNo,
        date: invoiceDto.date instanceof Date ? invoiceDto.date : new Date(invoiceDto.date),
        entityId: trimmedSupplierId,
        salesmanId: invoiceDto.salesmanId ?? '..default..............',
        warehouseId: invoiceDto.warehouseId,
        exchangeId: invoiceDto.exchangeId ?? '..rupiah...............',
        isCash: invoiceDto.isCash ?? false,
        dueDate: invoiceDto.dueDate ? (invoiceDto.dueDate instanceof Date ? invoiceDto.dueDate : new Date(invoiceDto.dueDate)) : null,
        special: 'BL',
        remark: invoiceDto.remark ?? ' ',
        value: invoiceValue,
        opening: invoiceDto.opening ?? 1, // Mark as opening balance
        serie: ' ',
        taxInvoice: ' ',
        po: ' ',
        remark1: ' ',
        returnTo: '',
        transfer: 'n/a',
        piutang: invoiceValue,
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
        oleh: null,
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
        rate: 1.0,
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
      const invoiceData: Partial<Invoice> = {
        refNo: invoiceDto.refNo,
        date: invoiceDto.date instanceof Date ? invoiceDto.date : new Date(invoiceDto.date),
        entityId: trimmedCustomerId,
        salesmanId: invoiceDto.salesmanId ?? '..default..............',
        warehouseId: invoiceDto.warehouseId,
        exchangeId: invoiceDto.exchangeId ?? '..rupiah...............',
        isCash: invoiceDto.isCash ?? false,
        dueDate: invoiceDto.dueDate ? (invoiceDto.dueDate instanceof Date ? invoiceDto.dueDate : new Date(invoiceDto.dueDate)) : null,
        special: 'JL', // JL = sales invoice for customer
        remark: invoiceDto.remark ?? ' ',
        value: invoiceValue,
        opening: invoiceDto.opening ?? 1,
        serie: ' ',
        taxInvoice: ' ',
        po: ' ',
        remark1: ' ',
        returnTo: '',
        transfer: 'n/a',
        piutang: invoiceValue,
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
        oleh: null,
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
        rate: 1.0,
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
    // Calculate remaining amount (piutang - paid amounts)
    const rem = invoice.isPaid ? 0 : (invoice.piutang - invoice.tunai - invoice.credit - invoice.debit);
    
    return {
      id: invoice.id,
      invoice: invoice.refNo || invoice.id,
      date: invoice.date || new Date(),
      warehouse: invoice.warehouseId || '',
      currency: invoice.exchangeId || '',
      amount: invoice.value || 0,
      remark: invoice.remark || null,
      rem: rem > 0 ? rem : null,
    };
  }
}

