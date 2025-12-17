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
import { StockGroupService } from '../../../infrastructure/persistence/stockgroup/services/stockgroup.service';
import { CreateStockGroupDto } from '../dto/create-stockgroup.dto';
import { UpdateStockGroupDto } from '../dto/update-stockgroup.dto';
import { StockGroupResponseDto } from '../dto/stockgroup-response.dto';

@Controller('stockgroups')
export class StockGroupController {
  constructor(private readonly stockGroupService: StockGroupService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createStockGroupDto: CreateStockGroupDto,
  ): Promise<StockGroupResponseDto> {
    return this.stockGroupService.create(createStockGroupDto);
  }

  @Get()
  async findAll(): Promise<StockGroupResponseDto[]> {
    return this.stockGroupService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<StockGroupResponseDto> {
    return this.stockGroupService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateStockGroupDto: UpdateStockGroupDto,
  ): Promise<StockGroupResponseDto> {
    return this.stockGroupService.update(id, updateStockGroupDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.stockGroupService.remove(id);
  }
}
