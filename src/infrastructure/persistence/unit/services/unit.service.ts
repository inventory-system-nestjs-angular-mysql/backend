import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { IUnitRepository } from '../../../../core/unit/repositories/unit.repository.interface';
import { UNIT_REPOSITORY } from '../../../../core/unit/repositories/repository.tokens';
import { Unit } from '../../../../core/unit/entities/unit.entity';
import { CreateUnitDto } from '../../../../presentation/unit/dto/create-unit.dto';
import { UpdateUnitDto } from '../../../../presentation/unit/dto/update-unit.dto';
import { UnitResponseDto } from '../../../../presentation/unit/dto/unit-response.dto';
import { BaseService } from '../../../../core/services/base.service';

@Injectable()
export class UnitService extends BaseService {
  constructor(
    @Inject(UNIT_REPOSITORY)
    private readonly unitRepository: IUnitRepository,
  ) {
    super();
  }

  async create(
    createUnitDto: CreateUnitDto,
  ): Promise<UnitResponseDto> {
    // Generate a backend primary key (23 chars) and ensure uniqueness.
    const id = await this.generateUniqueId(
      (id) => this.unitRepository.exists(id),
      'Unable to generate a unique primary key for Unit',
    );

    // Check if description already exists (unique constraint)
    const existsByDesc = await this.unitRepository.existsByDescription(
      createUnitDto.description,
    );
    if (existsByDesc) {
      throw new ConflictException(
        `Unit with description '${createUnitDto.description}' already exists`,
      );
    }

    var newSerialNumber = await this.unitRepository.createNewSerialNumber();

    // Compose domain partial including generated primary key
    const unitPartial: Partial<Unit> = {
      id,
      description: createUnitDto.description,
      serialNumber: newSerialNumber ?? null,
      coreTax: createUnitDto.coreTax ?? null,
    };

    const unit = await this.unitRepository.create(unitPartial);
    return this.mapToResponseDto(unit);
  }

  async findAll(): Promise<UnitResponseDto[]> {
    const units = await this.unitRepository.findAll();
    return units.map((u) => this.mapToResponseDto(u));
  }

  async findOne(id: string): Promise<UnitResponseDto> {
    const unit = await this.unitRepository.findOne(id);
    if (!unit) {
      throw new NotFoundException(
        `Unit with id '${id}' not found`,
      );
    }
    return this.mapToResponseDto(unit);
  }

  async update(
    id: string,
    updateUnitDto: UpdateUnitDto,
  ): Promise<UnitResponseDto> {
    // Check if the unit exists
    const exists = await this.unitRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(
        `Unit with id '${id}' not found`,
      );
    }

    // If updating description, check for uniqueness
    if (updateUnitDto.description) {
      const existingByDesc =
        await this.unitRepository.findByDescription(updateUnitDto.description);
      if (existingByDesc && existingByDesc.id !== id) {
        throw new ConflictException(
          `Unit with description '${updateUnitDto.description}' already exists`,
        );
      }
    }

    // If updating primary key, check if new key already exists
    if (updateUnitDto.id && updateUnitDto.id !== id) {
      const existsNewPk = await this.unitRepository.exists(
        updateUnitDto.id,
      );
      if (existsNewPk) {
        throw new ConflictException(
          `Unit with id '${updateUnitDto.id}' already exists`,
        );
      }
    }

    // Convert DTO to domain entity format
    const updateData: Partial<Unit> = {
      ...(updateUnitDto.id && { id: updateUnitDto.id }),
      ...(updateUnitDto.description && { description: updateUnitDto.description }),
      ...(updateUnitDto.serialNumber !== undefined && { serialNumber: updateUnitDto.serialNumber }),
      ...(updateUnitDto.coreTax !== undefined && { coreTax: updateUnitDto.coreTax }),
    };

    const updated = await this.unitRepository.update(
      id,
      updateData,
    );
    return this.mapToResponseDto(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.unitRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(
        `Unit with id '${id}' not found`,
      );
    }
    await this.unitRepository.delete(id);
  }

  private mapToResponseDto(unit: Unit): UnitResponseDto {
    return {
      id: unit.id,
      description: unit.description,
      serialNumber: unit.serialNumber,
      coreTax: unit.coreTax,
    };
  }
}

