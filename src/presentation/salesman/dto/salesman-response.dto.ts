/**
 * Presentation Layer DTO - HTTP Response DTO for Salesman
 */
export class SalesmanResponseDto {
  id: string;
  name: string;
  address1?: string | null;
  address2?: string | null;
  address3?: string | null;
  lastDate?: Date | null;
  commission?: number | null;
  isSuspended?: boolean;
  memo?: string | null;
  imagePath?: string | null;
  special?: string | null;
}

