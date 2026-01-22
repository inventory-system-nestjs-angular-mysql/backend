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
import { BankService } from '../../../infrastructure/persistence/bank/services/bank.service';
import { CreateBankDto } from '../dto/create-bank.dto';
import { UpdateBankDto } from '../dto/update-bank.dto';
import { BankResponseDto } from '../dto/bank-response.dto';

@Controller('banks')
export class BankController {
  constructor(private readonly bankService: BankService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createBankDto: CreateBankDto,
  ): Promise<BankResponseDto> {
    return this.bankService.create(createBankDto);
  }

  @Get()
  async findAll(): Promise<BankResponseDto[]> {
    return this.bankService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<BankResponseDto> {
    return this.bankService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateBankDto: UpdateBankDto,
  ): Promise<BankResponseDto> {
    return this.bankService.update(id, updateBankDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.bankService.remove(id);
  }
}

