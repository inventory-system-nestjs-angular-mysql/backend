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
import { SalesmanService } from '../../../infrastructure/persistence/salesman/services/salesman.service';
import { CreateSalesmanDto } from '../dto/create-salesman.dto';
import { UpdateSalesmanDto } from '../dto/update-salesman.dto';
import { SalesmanResponseDto } from '../dto/salesman-response.dto';

@Controller('salesmen')
export class SalesmanController {
  constructor(private readonly salesmanService: SalesmanService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createSalesmanDto: CreateSalesmanDto,
  ): Promise<SalesmanResponseDto> {
    return this.salesmanService.create(createSalesmanDto);
  }

  @Get()
  async findAll(): Promise<SalesmanResponseDto[]> {
    return this.salesmanService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<SalesmanResponseDto> {
    return this.salesmanService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateSalesmanDto: UpdateSalesmanDto,
  ): Promise<SalesmanResponseDto> {
    return this.salesmanService.update(id, updateSalesmanDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.salesmanService.remove(id);
  }
}

