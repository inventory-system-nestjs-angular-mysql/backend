import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { CurrencyService } from '../../../infrastructure/persistence/currency/services/currency.service';
import { CreateCurrencyDto } from '../dto/create-currency.dto';
import { UpdateCurrencyDto } from '../dto/update-currency.dto';
import { CurrencyResponseDto } from '../dto/currency-response.dto';

@Controller('currencies')
export class CurrencyController {
  constructor(private readonly currencyService: CurrencyService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCurrencyDto: CreateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    return this.currencyService.create(createCurrencyDto);
  }

  @Get()
  async findAll(): Promise<CurrencyResponseDto[]> {
    return this.currencyService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CurrencyResponseDto> {
    return this.currencyService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCurrencyDto: UpdateCurrencyDto,
  ): Promise<CurrencyResponseDto> {
    return this.currencyService.update(id, updateCurrencyDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.currencyService.remove(id);
  }
}

