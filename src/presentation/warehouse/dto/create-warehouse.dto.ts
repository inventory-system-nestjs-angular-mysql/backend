import {
  IsString,
  IsNotEmpty,
  IsOptional,
  IsNumber,
  MaxLength,
  Length,
} from 'class-validator';
import { Type } from 'class-transformer';

/**
 * Presentation Layer DTO - HTTP Request DTO
 */
export class CreateWarehouseDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  description: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  serialNumber?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  refNo?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  kepalaSeri?: string | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  option?: number | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  cr?: number | null;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  kepalaSeri1?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  kepalaSeri2?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  kepalaSeri3?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  kepalaSeri4?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  kepalaSeri5?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  refNo1?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  refNo2?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  refNo3?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  refNo4?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  refNo5?: string | null;

  @IsString()
  @IsOptional()
  @Length(0, 23)
  lok1?: string | null;

  @IsString()
  @IsOptional()
  @Length(0, 23)
  lok2?: string | null;

  @IsString()
  @IsOptional()
  @Length(0, 23)
  lok3?: string | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  min?: number | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  max?: number | null;

  @IsNumber()
  @IsOptional()
  @Type(() => Number)
  slipat?: number | null;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  kepalaSeri1b?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  kepalaSeri1c?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  refNo1b?: string | null;

  @IsString()
  @IsOptional()
  @MaxLength(20)
  refNo1c?: string | null;
}

