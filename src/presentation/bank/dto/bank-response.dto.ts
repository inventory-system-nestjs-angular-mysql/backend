/**
 * Presentation Layer DTO - HTTP Response DTO
 */
export class BankResponseDto {
  id: string;
  description: string;
  gl: string | null;
  account: string | null;
  serialNumber: string | null;
}

