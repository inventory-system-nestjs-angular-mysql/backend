/**
 * Presentation Layer DTO - HTTP Response DTO
 */
export class CurrencyResponseDto {
  id: string;
  currency: string;
  rate: number;
  taxRate: number;
  serialNumber: string | null;
}

