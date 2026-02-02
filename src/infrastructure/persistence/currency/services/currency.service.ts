import {
  Injectable,
  NotFoundException,
  ConflictException,
  Inject,
} from '@nestjs/common';
import { ICurrencyRepository } from '../../../../core/currency/repositories/currency.repository.interface';
import { CURRENCY_REPOSITORY } from '../../../../core/currency/repositories/repository.tokens';
import { Currency } from '../../../../core/currency/entities/currency.entity';
import { CreateCurrencyDto } from '../../../../presentation/currency/dto/create-currency.dto';
import { UpdateCurrencyDto } from '../../../../presentation/currency/dto/update-currency.dto';
import { CurrencyResponseDto } from '../../../../presentation/currency/dto/currency-response.dto';
import { BaseService } from '../../../../core/services/base.service';

@Injectable()
export class CurrencyService extends BaseService {
  constructor(
    @Inject(CURRENCY_REPOSITORY)
    private readonly currencyRepository: ICurrencyRepository,
  ) {
    super();
  }

  async create(
    createCurrencyDto: CreateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    const id = await this.generateUniqueId(
      (id) => this.currencyRepository.exists(id),
      'Unable to generate a unique primary key for Currency',
    );

    const existsByCurrency = await this.currencyRepository.existsByCurrency(
      createCurrencyDto.currency,
    );
    if (existsByCurrency) {
      throw new ConflictException(
        `Currency with code '${createCurrencyDto.currency}' already exists`,
      );
    }

    const newSerialNumber = await this.currencyRepository.createNewSerialNumber();

    const currencyPartial: Partial<Currency> = {
      id,
      currency: createCurrencyDto.currency,
      rate: createCurrencyDto.rate,
      taxRate: createCurrencyDto.taxRate ?? 0,
      serialNumber: createCurrencyDto.serialNumber ?? newSerialNumber ?? null,
    };

    const currency = await this.currencyRepository.create(currencyPartial);
    return this.mapToResponseDto(currency);
  }

  async findAll(): Promise<CurrencyResponseDto[]> {
    const currencies = await this.currencyRepository.findAll();
    return currencies.map((currency) => this.mapToResponseDto(currency));
  }

  async findOne(id: string): Promise<CurrencyResponseDto> {
    const currency = await this.currencyRepository.findOne(id);
    if (!currency) {
      throw new NotFoundException(`Currency with id '${id}' not found`);
    }
    return this.mapToResponseDto(currency);
  }

  async update(
    id: string,
    updateCurrencyDto: UpdateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    const exists = await this.currencyRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Currency with id '${id}' not found`);
    }

    if (updateCurrencyDto.currency) {
      const existingByCurrency = await this.currencyRepository.findByCurrency(updateCurrencyDto.currency);
      if (existingByCurrency && existingByCurrency.id !== id) {
        throw new ConflictException(
          `Currency with code '${updateCurrencyDto.currency}' already exists`,
        );
      }
    }

    const updateData: Partial<Currency> = {
      ...(updateCurrencyDto.currency !== undefined && { currency: updateCurrencyDto.currency }),
      ...(updateCurrencyDto.rate !== undefined && { rate: updateCurrencyDto.rate }),
      ...(updateCurrencyDto.taxRate !== undefined && { taxRate: updateCurrencyDto.taxRate }),
      ...(updateCurrencyDto.serialNumber !== undefined && { serialNumber: updateCurrencyDto.serialNumber }),
    };

    const updated = await this.currencyRepository.update(id, updateData);
    return this.mapToResponseDto(updated);
  }

  async remove(id: string): Promise<void> {
    const exists = await this.currencyRepository.exists(id);
    if (!exists) {
      throw new NotFoundException(`Currency with id '${id}' not found`);
    }
    await this.currencyRepository.delete(id);
  }

  private mapToResponseDto(currency: Currency): CurrencyResponseDto {
    return {
      id: currency.id,
      currency: currency.currency,
      rate: currency.rate,
      taxRate: currency.taxRate,
      serialNumber: currency.serialNumber,
    };
  }
}

