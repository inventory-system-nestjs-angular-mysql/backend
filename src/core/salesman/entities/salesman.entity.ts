/**
 * Domain Entity - Pure business entity without infrastructure concerns
 */
export class Salesman {
  id: string;
  description: string;
  address1: string | null;
  address2: string | null;
  address3: string | null;
  lastDate: Date | null;
  memo: string | null;
  isSuspended: boolean;
  special: string | null;
  imagePath: string | null;
  serialNumber: string | null;
  commission: number | null; // Commission percentage
}

