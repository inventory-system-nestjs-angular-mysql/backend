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
import { UnitService } from '../../../infrastructure/persistence/unit/services/unit.service';
import { CreateUnitDto } from '../dto/create-unit.dto';
import { UpdateUnitDto } from '../dto/update-unit.dto';
import { UnitResponseDto } from '../dto/unit-response.dto';

@Controller('units')
export class UnitController {
  constructor(private readonly unitService: UnitService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createUnitDto: CreateUnitDto,
  ): Promise<UnitResponseDto> {
    return this.unitService.create(createUnitDto);
  }

  @Get()
  async findAll(): Promise<UnitResponseDto[]> {
    return this.unitService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<UnitResponseDto> {
    return this.unitService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateUnitDto: UpdateUnitDto,
  ): Promise<UnitResponseDto> {
    return this.unitService.update(id, updateUnitDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.unitService.remove(id);
  }
}

