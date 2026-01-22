import {
  IsString,
  IsNotEmpty,
  IsOptional,
  MaxLength,
} from 'class-validator';

/**
 * Presentation Layer DTO - HTTP Request DTO
 */
export class CreateBrandDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(40)
  description: string;

  @IsString()
  @IsOptional()
  @MaxLength(10)
  serialNumber?: string | null;
}

