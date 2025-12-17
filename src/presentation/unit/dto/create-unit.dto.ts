import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';

/**
 * Presentation Layer DTO - HTTP Request DTO
 */
export class CreateUnitDto {
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
  @MaxLength(7)
  coreTax?: string | null;
}

