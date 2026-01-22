import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { IBankRepository } from '../../../../core/bank/repositories/bank.repository.interface';
import { BANK_REPOSITORY } from '../../../../core/bank/repositories/repository.tokens';
import { Bank } from '../../../../core/bank/entities/bank.entity';
import { CreateBankDto } from '../../../../presentation/bank/dto/create-bank.dto';
import { UpdateBankDto } from '../../../../presentation/bank/dto/update-bank.dto';
import { BankResponseDto } from '../../../../presentation/bank/dto/bank-response.dto';
import { BaseService } from '../../../../core/services/base.service';

@Injectable()
export class BankService extends BaseService {
  constructor(
    @Inject(BANK_REPOSITORY)
    private readonly bankRepository: IBankRepository,
  ) {
    super();
  }

  async create(
    createBankDto: CreateBankDto,
  ): Promise<BankResponseDto> {
    // Generate a backend primary key (23 chars) and ensure uniqueness.
    const id = await this.generateUniqueId(
      (id) => this.bankRepository.exists(id),
      'Unable to generate a unique primary key for Bank',
    );

    // Check if description already exists (unique constraint)
    const existsByDesc = await this.bankRepository.existsByDescription(
      createBankDto.description,
    );
    if (existsByDesc) {
      throw new ConflictException(
        `Bank with description '${createBankDto.description}' already exists`,
      );
    }

    var newSerialNumber = await this.bankRepository.createNewSerialNumber();

    // Compose domain partial including generated primary key
    const bankPartial: Partial<Bank> = {
      id,
      description: createBankDto.description,
      gl: createBankDto.gl ?? null,
      account: createBankDto.account ?? null,
      serialNumber: newSerialNumber ?? null,
    };

    const bank = await this.bankRepository.create(bankPartial);
    return this.mapToResponseDto(bank);
  }

  async findAll(): Promise<BankResponseDto[]> {
    const banks = await this.bankRepository.findAll();
    return banks.map((bank) => this.mapToResponseDto(bank));
  }

  async findOne(id: string): Promise<BankResponseDto> {
    const bank = await this.bankRepository.findOne(id);
    if (!bank) {
      throw new NotFoundException(
        `Bank with id '${id}' not found`,
      );
    }
    return this.mapToResponseDto(bank);
  }

  async update(
    id: string,
    updateBankDto: UpdateBankDto,
  ): Promise<BankResponseDto> {
    // Check if the bank exists
    const exists = await this.bankRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(
        `Bank with id '${id}' not found`,
      );
    }

    // If updating description, check for uniqueness
    if (updateBankDto.description) {
      const existingByDesc =
        await this.bankRepository.findByDescription(updateBankDto.description);
      if (existingByDesc && existingByDesc.id !== id) {
        throw new ConflictException(
          `Bank with description '${updateBankDto.description}' already exists`,
        );
      }
    }

    // If updating primary key, check if new key already exists
    if (updateBankDto.id && updateBankDto.id !== id) {
      const existsNewPk = await this.bankRepository.exists(
        updateBankDto.id,
      );
      if (existsNewPk) {
        throw new ConflictException(
          `Bank with id '${updateBankDto.id}' already exists`,
        );
      }
    }

    // Convert DTO to domain entity format
    const updateData: Partial<Bank> = {
      ...(updateBankDto.id && { id: updateBankDto.id }),
      ...(updateBankDto.description && { description: updateBankDto.description }),
      ...(updateBankDto.gl !== undefined && { gl: updateBankDto.gl }),
      ...(updateBankDto.account !== undefined && { account: updateBankDto.account }),
      ...(updateBankDto.serialNumber !== undefined && { serialNumber: updateBankDto.serialNumber }),
    };

    const updated = await this.bankRepository.update(
      id,
      updateData,
    );
    return this.mapToResponseDto(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.bankRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(
        `Bank with id '${id}' not found`,
      );
    }
    await this.bankRepository.delete(id);
  }

  private mapToResponseDto(bank: Bank): BankResponseDto {
    return {
      id: bank.id,
      description: bank.description,
      gl: bank.gl,
      account: bank.account,
      serialNumber: bank.serialNumber,
    };
  }
}

