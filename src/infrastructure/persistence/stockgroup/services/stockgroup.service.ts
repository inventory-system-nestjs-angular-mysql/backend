import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { IStockGroupRepository } from '../../../../core/stockgroup/repositories/stockgroup.repository.interface';
import { STOCK_GROUP_REPOSITORY } from '../../../../core/stockgroup/repositories/repository.tokens';
import { StockGroup } from '../../../../core/stockgroup/entities/stockgroup.entity';
import { CreateStockGroupDto } from '../../../../presentation/stockgroup/dto/create-stockgroup.dto';
import { UpdateStockGroupDto } from '../../../../presentation/stockgroup/dto/update-stockgroup.dto';
import { StockGroupResponseDto } from '../../../../presentation/stockgroup/dto/stockgroup-response.dto';
import { BaseService } from '../../../../core/services/base.service';

@Injectable()
export class StockGroupService extends BaseService {
  constructor(
    @Inject(STOCK_GROUP_REPOSITORY)
    private readonly stockGroupRepository: IStockGroupRepository,
  ) {
    super();
  }

  async create(
    createStockGroupDto: CreateStockGroupDto,
  ): Promise<StockGroupResponseDto> {
    // Generate a backend primary key (23 chars) and ensure uniqueness.
    const id = await this.generateUniqueId(
      (id) => this.stockGroupRepository.exists(id),
      'Unable to generate a unique primary key for StockGroup',
    );

    // Check if description already exists (unique constraint)
    const existsByDesc = await this.stockGroupRepository.existsByDescription(
      createStockGroupDto.description,
    );
    if (existsByDesc) {
      throw new ConflictException(
        `StockGroup with description '${createStockGroupDto.description}' already exists`,
      );
    }

    var newSerialNumber = await this.stockGroupRepository.createNewSerialNumber();

    // Compose domain partial including generated primary key
    const stockGroupPartial: Partial<StockGroup> = {
      id,
      description: createStockGroupDto.description,
      serialNumber: newSerialNumber ?? null,
      markupAmount1: createStockGroupDto.markupAmount1 ?? null,
      markupPercentage1: createStockGroupDto.markupPercentage1 ?? null,
      markupAmount2: createStockGroupDto.markupAmount2 ?? null,
      markupPercentage2: createStockGroupDto.markupPercentage2 ?? null,
      groupValue: createStockGroupDto.groupValue ?? null,
      groupValueDollar: createStockGroupDto.groupValueDollar ?? null,
      groupCode: createStockGroupDto.groupCode ?? null,
      quantity: createStockGroupDto.quantity ?? 0,
    };

    const stockGroup = await this.stockGroupRepository.create(stockGroupPartial);
    return this.mapToResponseDto(stockGroup);
  }

  async findAll(): Promise<StockGroupResponseDto[]> {
    const stockGroups = await this.stockGroupRepository.findAll();
    return stockGroups.map((sg) => this.mapToResponseDto(sg));
  }

  async findOne(id: string): Promise<StockGroupResponseDto> {
    const stockGroup = await this.stockGroupRepository.findOne(id);
    if (!stockGroup) {
      throw new NotFoundException(
        `StockGroup with id '${id}' not found`,
      );
    }
    return this.mapToResponseDto(stockGroup);
  }

  async update(
    id: string,
    updateStockGroupDto: UpdateStockGroupDto,
  ): Promise<StockGroupResponseDto> {
    // Check if the stock group exists
    const exists = await this.stockGroupRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(
        `StockGroup with id '${id}' not found`,
      );
    }

    // If updating description, check for uniqueness
    if (updateStockGroupDto.description) {
      const existingByDesc =
        await this.stockGroupRepository.findByDescription(updateStockGroupDto.description);
      if (existingByDesc && existingByDesc.id !== id) {
        throw new ConflictException(
          `StockGroup with description '${updateStockGroupDto.description}' already exists`,
        );
      }
    }

    // If updating primary key, check if new key already exists
    if (updateStockGroupDto.id && updateStockGroupDto.id !== id) {
      const existsNewPk = await this.stockGroupRepository.exists(
        updateStockGroupDto.id,
      );
      if (existsNewPk) {
        throw new ConflictException(
          `StockGroup with id '${updateStockGroupDto.id}' already exists`,
        );
      }
    }

    // Convert DTO to domain entity format
    const updateData: Partial<StockGroup> = {
      ...(updateStockGroupDto.id && { id: updateStockGroupDto.id }),
      ...(updateStockGroupDto.description && { description: updateStockGroupDto.description }),
      ...(updateStockGroupDto.serialNumber !== undefined && { serialNumber: updateStockGroupDto.serialNumber }),
      ...(updateStockGroupDto.markupAmount1 !== undefined && { markupAmount1: updateStockGroupDto.markupAmount1 }),
      ...(updateStockGroupDto.markupPercentage1 !== undefined && { markupPercentage1: updateStockGroupDto.markupPercentage1 }),
      ...(updateStockGroupDto.markupAmount2 !== undefined && { markupAmount2: updateStockGroupDto.markupAmount2 }),
      ...(updateStockGroupDto.markupPercentage2 !== undefined && { markupPercentage2: updateStockGroupDto.markupPercentage2 }),
      ...(updateStockGroupDto.groupValue !== undefined && { groupValue: updateStockGroupDto.groupValue }),
      ...(updateStockGroupDto.groupValueDollar !== undefined && { groupValueDollar: updateStockGroupDto.groupValueDollar }),
      ...(updateStockGroupDto.groupCode !== undefined && { groupCode: updateStockGroupDto.groupCode }),
      ...(updateStockGroupDto.quantity !== undefined && { quantity: updateStockGroupDto.quantity }),
    };

    const updated = await this.stockGroupRepository.update(
      id,
      updateData,
    );
    return this.mapToResponseDto(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.stockGroupRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(
        `StockGroup with id '${id}' not found`,
      );
    }
    await this.stockGroupRepository.delete(id);
  }

  private mapToResponseDto(stockGroup: StockGroup): StockGroupResponseDto {
    return {
      id: stockGroup.id,
      description: stockGroup.description,
      serialNumber: stockGroup.serialNumber,
      markupAmount1: stockGroup.markupAmount1,
      markupPercentage1: stockGroup.markupPercentage1,
      markupAmount2: stockGroup.markupAmount2,
      markupPercentage2: stockGroup.markupPercentage2,
      groupValue: stockGroup.groupValue,
      groupValueDollar: stockGroup.groupValueDollar,
      groupCode: stockGroup.groupCode,
      quantity: stockGroup.quantity,
    };
  }
}

