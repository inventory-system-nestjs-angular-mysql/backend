import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { IStockRepository } from '../../../../core/stock/repositories/stock.repository.interface';
import { IStockDetailRepository } from '../../../../core/stock/repositories/stock-detail.repository.interface';
import { STOCK_REPOSITORY, STOCK_DETAIL_REPOSITORY } from '../../../../core/stock/repositories/repository.tokens';
import { Stock } from '../../../../core/stock/entities/stock.entity';
import { StockDetail } from '../../../../core/stock/entities/stock-detail.entity';
import { CreateStockDto } from '../../../../presentation/stock/dto/create-stock.dto';
import { UpdateStockDto } from '../../../../presentation/stock/dto/update-stock.dto';
import { StockResponseDto } from '../../../../presentation/stock/dto/stock-response.dto';
import { StockDetailResponseDto } from '../../../../presentation/stock/dto/stock-detail-response.dto';
import { StockDetailLookupItemDto } from '../../../../presentation/stock/dto/stock-detail-lookup-item.dto';
import { CreateStockDetailDto } from '../../../../presentation/stock/dto/create-stock-detail.dto';
import { UpdateStockDetailDto } from '../../../../presentation/stock/dto/update-stock-detail.dto';
import { BaseService } from '../../../../core/services/base.service';

@Injectable()
export class StockService extends BaseService {
  constructor(
    @Inject(STOCK_REPOSITORY)
    private readonly stockRepository: IStockRepository,
    @Inject(STOCK_DETAIL_REPOSITORY)
    private readonly stockDetailRepository: IStockDetailRepository,
  ) {
    super();
  }

  async create(
    createStockDto: CreateStockDto,
  ): Promise<StockResponseDto> {
    // Generate a backend primary key (23 chars) and ensure uniqueness.
    const id = await this.generateUniqueId(
      (id) => this.stockRepository.exists(id),
      'Unable to generate a unique primary key for Stock',
    );

    // Map taxOption from string to number (Tax=1, Tax Free=0, Non Tax=2)
    const taxOptionMap: Record<string, number> = {
      'Tax': 1,
      'Tax Free': 0,
      'Non Tax': 2,
    };

    // Check if description already exists
    const existsByDesc = await this.stockRepository.existsByDescription(
      createStockDto.stockName,
    );
    if (existsByDesc) {
      throw new ConflictException(
        `Stock with name '${createStockDto.stockName}' already exists`,
      );
    }

    // Compose domain partial including generated primary key
    const stockPartial: Partial<Stock> = {
      id,
      description: createStockDto.stockName,
      stockGroupId: createStockDto.stockGroupId ?? null,
      minimumStock: createStockDto.minStock ?? 0,
      maximumStock: createStockDto.maxStock ?? 0,
      purchasePrice: createStockDto.purchasePrice ?? 0,
      costOfGoodsSold: createStockDto.cogs ?? 0,
      purchasePriceDollar: createStockDto.purchasePriceDollar ?? 0,
      costOfGoodsSoldDollar: createStockDto.cogsDollar ?? 0,
      extraFee: createStockDto.extraFee ?? 0,
      extraFeeDollar: createStockDto.extraFeeDollar ?? 0,
      isService: createStockDto.isService ?? false,
      isSuspended: createStockDto.isSuspended ?? false,
      memo: createStockDto.memo ?? null,
      imagePath: createStockDto.imagePath ?? null,
      isOpenPrice: createStockDto.openPrice ?? false,
      taxOption: taxOptionMap[createStockDto.taxOption] ?? 1,
      rack: createStockDto.rack1 ?? null,
      rack2: createStockDto.rack2 ?? null,
      rack3: createStockDto.rack3 ?? null,
      rack4: createStockDto.rack4 ?? null,
      copyToSalesInvoice: createStockDto.copyMemoToSalesInvoice ?? false,
      copyToPurchasing: createStockDto.copyMemoToPurchasing ?? false,
      markupPercentage1: createStockDto.wholesaleMarkup ?? 0,
      markupPercentage2: createStockDto.retailMarkup ?? 0,
      markupPercentage3: createStockDto.price3Markup ?? 0,
      markupPercentage4: createStockDto.price4Markup ?? 0,
      markupPercentage5: createStockDto.price5Markup ?? 0,
      partNumber1: createStockDto.partNo1 ?? null,
      partNumber2: createStockDto.partNo2 ?? null,
      weight: createStockDto.weight ?? 0,
      length: createStockDto.dimLength ?? 0,
      width: createStockDto.dimWidth ?? 0,
      height: createStockDto.dimHeight ?? 0,
      storeType: createStockDto.storeType ?? null,
      isConsignment: createStockDto.isConsignment ?? false,
      selectPriceTags: createStockDto.selectPriceTags ?? false,
      roundUp: createStockDto.roundUp ?? false,
      priceByQuantity: createStockDto.priceByQty ?? false,
      blockIfBelowPurchase: createStockDto.blockIfBelowPurchase ?? false,
      warnIfBelowCost: createStockDto.warnIfBelowCogs ?? false,
      coreTaxCode: createStockDto.kodeCoretax ?? null,
      permitLicense: createStockDto.permitLicense ?? null,
      smallBusiness: createStockDto.smallBusinessItem ?? false,
    };

    const stock = await this.stockRepository.create(stockPartial);

    // Create stock details if provided
    if (createStockDto.stockDetails && createStockDto.stockDetails.length > 0) {
      const { generateId: generateDetailId } = await import('../../../utils/id.util');
      const stockDetailPartials: Partial<StockDetail>[] = createStockDto.stockDetails.map(
        (priceRow) => {
          const detailId = generateDetailId();
          // Map from frontend StockPriceRow to StockDetail
          // Note: unitId needs to be resolved from unit name - for now using unit name as placeholder
          // In production, you'd look up the unit ID from a units table
          return {
            id: detailId,
            stockId: stock.id,
            unitId: priceRow.unit || '', // TODO: Resolve unit name to unit ID from units table
            conversionFactor: priceRow.factor ?? null,
            price: priceRow.wholesale ?? null,
            retailPrice: priceRow.retail ?? null,
            priceDollar: priceRow.priceDollar ?? null,
            price1: priceRow.price3 ?? null,
            price2: priceRow.price4 ?? null,
            price3: priceRow.price5 ?? null,
            code: priceRow.stockCode || '',
            // key field maps to isKey
            key: priceRow.isKey ? 1 : null,
          };
        },
      );
      await this.stockDetailRepository.createMany(stockDetailPartials);
    }

    return await this.mapToResponseDto(stock);
  }

  async findAll(): Promise<StockResponseDto[]> {
    const stocks = await this.stockRepository.findAll();
    return Promise.all(stocks.map((stock) => this.mapToResponseDto(stock)));
  }

  async findOne(id: string): Promise<StockResponseDto> {
    const stock = await this.stockRepository.findOne(id);
    if (!stock) {
      throw new NotFoundException(`Stock with id '${id}' not found`);
    }
    return await this.mapToResponseDto(stock);
  }

  async update(
    id: string,
    updateStockDto: UpdateStockDto,
  ): Promise<StockResponseDto> {
    // Check if the stock exists
    const exists = await this.stockRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Stock with id '${id}' not found`);
    }

    // Map taxOption from string to number if provided
    const taxOptionMap: Record<string, number> = {
      'Tax': 1,
      'Tax Free': 0,
      'Non Tax': 2,
    };

    // If updating stockName, check for uniqueness
    if (updateStockDto.stockName) {
      const existingByDesc =
        await this.stockRepository.findByDescription(updateStockDto.stockName);
      if (existingByDesc && existingByDesc.id !== id) {
        throw new ConflictException(
          `Stock with name '${updateStockDto.stockName}' already exists`,
        );
      }
    }

    // Convert DTO to domain entity format
    const updateData: Partial<Stock> = {
      ...(updateStockDto.stockName && { description: updateStockDto.stockName }),
      ...(updateStockDto.minStock !== undefined && { minimumStock: updateStockDto.minStock }),
      ...(updateStockDto.maxStock !== undefined && { maximumStock: updateStockDto.maxStock }),
      ...(updateStockDto.purchasePrice !== undefined && { purchasePrice: updateStockDto.purchasePrice }),
      ...(updateStockDto.purchasePriceDollar !== undefined && { purchasePriceDollar: updateStockDto.purchasePriceDollar }),
      ...(updateStockDto.extraFee !== undefined && { extraFee: updateStockDto.extraFee }),
      ...(updateStockDto.extraFeeDollar !== undefined && { extraFeeDollar: updateStockDto.extraFeeDollar }),
      ...(updateStockDto.cogs !== undefined && { costOfGoodsSold: updateStockDto.cogs }),
      ...(updateStockDto.cogsDollar !== undefined && { costOfGoodsSoldDollar: updateStockDto.cogsDollar }),
      ...(updateStockDto.isService !== undefined && { isService: updateStockDto.isService }),
      ...(updateStockDto.isSuspended !== undefined && { isSuspended: updateStockDto.isSuspended }),
      ...(updateStockDto.memo !== undefined && { memo: updateStockDto.memo }),
      ...(updateStockDto.imagePath !== undefined && { imagePath: updateStockDto.imagePath }),
      ...(updateStockDto.openPrice !== undefined && { isOpenPrice: updateStockDto.openPrice }),
      ...(updateStockDto.taxOption && { taxOption: taxOptionMap[updateStockDto.taxOption] ?? 1 }),
      ...(updateStockDto.rack1 !== undefined && { rack: updateStockDto.rack1 }),
      ...(updateStockDto.rack2 !== undefined && { rack2: updateStockDto.rack2 }),
      ...(updateStockDto.rack3 !== undefined && { rack3: updateStockDto.rack3 }),
      ...(updateStockDto.rack4 !== undefined && { rack4: updateStockDto.rack4 }),
      ...(updateStockDto.copyMemoToSalesInvoice !== undefined && { copyToSalesInvoice: updateStockDto.copyMemoToSalesInvoice }),
      ...(updateStockDto.copyMemoToPurchasing !== undefined && { copyToPurchasing: updateStockDto.copyMemoToPurchasing }),
      ...(updateStockDto.wholesaleMarkup !== undefined && { markupPercentage1: updateStockDto.wholesaleMarkup }),
      ...(updateStockDto.retailMarkup !== undefined && { markupPercentage2: updateStockDto.retailMarkup }),
      ...(updateStockDto.price3Markup !== undefined && { markupPercentage3: updateStockDto.price3Markup }),
      ...(updateStockDto.price4Markup !== undefined && { markupPercentage4: updateStockDto.price4Markup }),
      ...(updateStockDto.price5Markup !== undefined && { markupPercentage5: updateStockDto.price5Markup }),
      ...(updateStockDto.partNo1 !== undefined && { partNumber1: updateStockDto.partNo1 }),
      ...(updateStockDto.partNo2 !== undefined && { partNumber2: updateStockDto.partNo2 }),
      ...(updateStockDto.weight !== undefined && { weight: updateStockDto.weight }),
      ...(updateStockDto.dimLength !== undefined && { length: updateStockDto.dimLength }),
      ...(updateStockDto.dimWidth !== undefined && { width: updateStockDto.dimWidth }),
      ...(updateStockDto.dimHeight !== undefined && { height: updateStockDto.dimHeight }),
      ...(updateStockDto.storeType !== undefined && { storeType: updateStockDto.storeType }),
      ...(updateStockDto.isConsignment !== undefined && { isConsignment: updateStockDto.isConsignment }),
      ...(updateStockDto.selectPriceTags !== undefined && { selectPriceTags: updateStockDto.selectPriceTags }),
      ...(updateStockDto.roundUp !== undefined && { roundUp: updateStockDto.roundUp }),
      ...(updateStockDto.priceByQty !== undefined && { priceByQuantity: updateStockDto.priceByQty }),
      ...(updateStockDto.blockIfBelowPurchase !== undefined && { blockIfBelowPurchase: updateStockDto.blockIfBelowPurchase }),
      ...(updateStockDto.warnIfBelowCogs !== undefined && { warnIfBelowCost: updateStockDto.warnIfBelowCogs }),
      ...(updateStockDto.kodeCoretax !== undefined && { coreTaxCode: updateStockDto.kodeCoretax }),
      ...(updateStockDto.permitLicense !== undefined && { permitLicense: updateStockDto.permitLicense }),
      ...(updateStockDto.smallBusinessItem !== undefined && { smallBusiness: updateStockDto.smallBusinessItem }),
      ...(updateStockDto.brand !== undefined && { brandId: updateStockDto.brand }),
      ...(updateStockDto.color !== undefined && { color: updateStockDto.color }),
      ...(updateStockDto.stockGroupId !== undefined && { stockGroupId: updateStockDto.stockGroupId }),
    };

    const updated = await this.stockRepository.update(id, updateData);

    // Update stock details if provided
    if (updateStockDto.stockDetails) {
      const { generateId: generateDetailId } = await import('../../../utils/id.util');
      // Fetch all existing details for this stock
      const existingDetails = await this.stockDetailRepository.findByStockId(id);
      const existingDetailMap = new Map(existingDetails.map(d => [d.id, d]));

      // Track IDs from payload
      const payloadIds = new Set<string>();

      for (const priceRow of updateStockDto.stockDetails) {
        let detailId = priceRow.id;
        if (detailId && existingDetailMap.has(detailId)) {
          // Update existing
          payloadIds.add(detailId);
          await this.stockDetailRepository.update(detailId, {
            stockId: id,
            unitId: priceRow.unit || '',
            conversionFactor: priceRow.factor ?? null,
            price: priceRow.wholesale ?? null,
            retailPrice: priceRow.retail ?? null,
            priceDollar: priceRow.priceDollar ?? null,
            price1: priceRow.price3 ?? null,
            price2: priceRow.price4 ?? null,
            price3: priceRow.price5 ?? null,
            code: priceRow.stockCode || '',
            key: priceRow.isKey ? 1 : null,
          });
        } else {
          // Create new
          detailId = generateDetailId();
          await this.stockDetailRepository.create({
            id: detailId,
            stockId: id,
            unitId: priceRow.unit || '',
            conversionFactor: priceRow.factor ?? null,
            price: priceRow.wholesale ?? null,
            retailPrice: priceRow.retail ?? null,
            priceDollar: priceRow.priceDollar ?? null,
            price1: priceRow.price3 ?? null,
            price2: priceRow.price4 ?? null,
            price3: priceRow.price5 ?? null,
            code: priceRow.stockCode || '',
            key: priceRow.isKey ? 1 : null,
          });
        }
      }

      // Delete details not present in payload
      for (const existing of existingDetails) {
        if (!payloadIds.has(existing.id)) {
          await this.stockDetailRepository.delete(existing.id);
        }
      }
    }

    return await this.mapToResponseDto(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.stockRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Stock with id '${id}' not found`);
    }
    
    // Delete stock details first (cascade delete)
    await this.stockDetailRepository.deleteByStockId(id);
    
    // Delete stock
    await this.stockRepository.delete(id);
  }

  // StockDetail CRUD operations
  async createStockDetail(
    stockId: string,
    createStockDetailDto: CreateStockDetailDto,
  ): Promise<StockDetailResponseDto> {
    // Verify stock exists
    const stock = await this.stockRepository.findOne(stockId);
    if (!stock) {
      throw new NotFoundException(`Stock with id '${stockId}' not found`);
    }

    const { generateId } = await import('../../../utils/id.util');
    const detailId = generateId();

    const stockDetailPartial: Partial<StockDetail> = {
      id: detailId,
      stockId,
      unitId: createStockDetailDto.unit || '',
      conversionFactor: createStockDetailDto.factor ?? null,
      price: createStockDetailDto.wholesale ?? null,
      retailPrice: createStockDetailDto.retail ?? null,
      priceDollar: createStockDetailDto.priceDollar ?? null,
      price1: createStockDetailDto.price3 ?? null,
      price2: createStockDetailDto.price4 ?? null,
      price3: createStockDetailDto.price5 ?? null,
      code: createStockDetailDto.stockCode || '',
      key: createStockDetailDto.isKey ? 1 : null,
    };

    const stockDetail = await this.stockDetailRepository.create(stockDetailPartial);
    return this.mapDetailToResponseDto(stockDetail);
  }

  async findAllStockDetailsForLookup(): Promise<StockDetailLookupItemDto[]> {
    const stockDetails = await this.stockDetailRepository.findAll();
    const stockIds = [...new Set(stockDetails.map((d) => d.stockId))];
    const stocks = await Promise.all(
      stockIds.map((id) => this.stockRepository.findOne(id)),
    );
    const stockMap = new Map<string, Stock>();
    stocks.forEach((s) => {
      if (s) stockMap.set(s.id, s);
    });
    return stockDetails.map((detail) => ({
      id: detail.id,
      stockId: detail.stockId,
      stockName: stockMap.get(detail.stockId)?.description ?? '',
      stockCode: detail.code,
      unit: detail.unitId,
      unitDescription: detail.unit ?? undefined,
      purchase: detail.price ?? 0,
    }));
  }

  async findStockDetails(stockId: string): Promise<StockDetailResponseDto[]> {
    const stockDetails = await this.stockDetailRepository.findByStockId(stockId);
    return stockDetails.map((detail) => this.mapDetailToResponseDto(detail));
  }

  async findStockDetail(id: string): Promise<StockDetailResponseDto> {
    const stockDetail = await this.stockDetailRepository.findOne(id);
    if (!stockDetail) {
      throw new NotFoundException(`StockDetail with id '${id}' not found`);
    }
    return this.mapDetailToResponseDto(stockDetail);
  }

  async updateStockDetail(
    id: string,
    updateStockDetailDto: UpdateStockDetailDto,
  ): Promise<StockDetailResponseDto> {
    const exists = await this.stockDetailRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`StockDetail with id '${id}' not found`);
    }

    const updateData: Partial<StockDetail> = {
      ...(updateStockDetailDto.unit !== undefined && { unitId: updateStockDetailDto.unit }),
      ...(updateStockDetailDto.factor !== undefined && { conversionFactor: updateStockDetailDto.factor }),
      ...(updateStockDetailDto.wholesale !== undefined && { price: updateStockDetailDto.wholesale }),
      ...(updateStockDetailDto.retail !== undefined && { retailPrice: updateStockDetailDto.retail }),
      ...(updateStockDetailDto.priceDollar !== undefined && { priceDollar: updateStockDetailDto.priceDollar }),
      ...(updateStockDetailDto.price3 !== undefined && { price1: updateStockDetailDto.price3 }),
      ...(updateStockDetailDto.price4 !== undefined && { price2: updateStockDetailDto.price4 }),
      ...(updateStockDetailDto.price5 !== undefined && { price3: updateStockDetailDto.price5 }),
      ...(updateStockDetailDto.stockCode !== undefined && { code: updateStockDetailDto.stockCode }),
      ...(updateStockDetailDto.isKey !== undefined && { key: updateStockDetailDto.isKey ? 1 : null }),
    };

    const updated = await this.stockDetailRepository.update(id, updateData);
    return this.mapDetailToResponseDto(updated);
  }

  async removeStockDetail(id: string): Promise<void> {
    const exists = await this.stockDetailRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`StockDetail with id '${id}' not found`);
    }
    await this.stockDetailRepository.delete(id);
  }

  private async mapToResponseDto(stock: Stock): Promise<StockResponseDto> {
    const stockDetails = await this.stockDetailRepository.findByStockId(stock.id);
    const stockDetailsDto = stockDetails.map((detail) => this.mapDetailToResponseDto(detail));

    // Map taxOption from number to string
    const taxOptionMap: Record<number, 'Tax' | 'Tax Free' | 'Non Tax'> = {
      1: 'Tax',
      0: 'Tax Free',
      2: 'Non Tax',
    };

    return {
      cSTKpk: stock.id,
      stockName: stock.description,
      stockGroupId: stock.stockGroupId,
      minStock: stock.minimumStock,
      maxStock: stock.maximumStock,
      purchasePrice: stock.purchasePrice,
      purchasePriceDollar: stock.purchasePriceDollar,
      extraFee: stock.extraFee,
      extraFeeDollar: stock.extraFeeDollar,
      cogs: stock.costOfGoodsSold,
      cogsDollar: stock.costOfGoodsSoldDollar,
      taxOption: taxOptionMap[stock.taxOption] || 'Tax',
      isService: stock.isService,
      isConsignment: stock.isConsignment,
      isSuspended: stock.isSuspended,
      selectPriceTags: stock.selectPriceTags,
      brand: stock.brandId,
      partNo1: stock.partNumber1,
      partNo2: stock.partNumber2,
      imagePath: stock.imagePath,
      memo: stock.memo,
      copyMemoToSalesInvoice: stock.copyToSalesInvoice,
      copyMemoToPurchasing: stock.copyToPurchasing,
      wholesaleMarkup: stock.markupPercentage1,
      retailMarkup: stock.markupPercentage2,
      price3Markup: stock.markupPercentage3,
      price4Markup: stock.markupPercentage4,
      price5Markup: stock.markupPercentage5,
      color: stock.color,
      weight: stock.weight,
      dimLength: stock.length,
      dimWidth: stock.width,
      dimHeight: stock.height,
      rack1: stock.rack,
      rack2: stock.rack2,
      rack3: stock.rack3,
      rack4: stock.rack4,
      storeType: stock.storeType,
      openPrice: stock.isOpenPrice,
      roundUp: stock.roundUp,
      priceByQty: stock.priceByQuantity,
      blockIfBelowPurchase: stock.blockIfBelowPurchase,
      warnIfBelowCogs: stock.warnIfBelowCost,
      blockIfInsufficientStock: stock.warnIfBelowPurchasePrice,
      kodeCoretax: stock.coreTaxCode,
      permitLicense: stock.permitLicense,
      smallBusinessItem: stock.smallBusiness,
      stockDetails: stockDetailsDto,
    };
  }

  private mapDetailToResponseDto(stockDetail: StockDetail): StockDetailResponseDto {
    return {
      id: stockDetail.id,
      stockId: stockDetail.stockId,
      stockCode: stockDetail.code,
      unit: stockDetail.unitId, // TODO: Lookup unit name from unitId
      factor: stockDetail.conversionFactor ?? 1,
      purchase: stockDetail.price ?? 0, // Using price as purchase for now
      wholesale: stockDetail.price ?? 0,
      retail: stockDetail.retailPrice ?? 0,
      priceDollar: stockDetail.priceDollar ?? undefined,
      price3: stockDetail.price1 ?? undefined,
      price4: stockDetail.price2 ?? undefined,
      price5: stockDetail.price3 ?? undefined,
      isKey: stockDetail.key === 1,
    };
  }
}

