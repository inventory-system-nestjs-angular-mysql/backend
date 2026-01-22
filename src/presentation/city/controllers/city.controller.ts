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
import { CityService } from '../../../infrastructure/persistence/city/services/city.service';
import { CreateCityDto } from '../dto/create-city.dto';
import { UpdateCityDto } from '../dto/update-city.dto';
import { CityResponseDto } from '../dto/city-response.dto';

@Controller('cities')
export class CityController {
  constructor(private readonly cityService: CityService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  async create(
    @Body() createCityDto: CreateCityDto,
  ): Promise<CityResponseDto> {
    return this.cityService.create(createCityDto);
  }

  @Get()
  async findAll(): Promise<CityResponseDto[]> {
    return this.cityService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<CityResponseDto> {
    return this.cityService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCityDto: UpdateCityDto,
  ): Promise<CityResponseDto> {
    return this.cityService.update(id, updateCityDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param('id') id: string): Promise<void> {
    return this.cityService.remove(id);
  }
}

