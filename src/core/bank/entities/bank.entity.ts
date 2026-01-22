/**
 * Domain Entity - Pure business entity without infrastructure concerns
 */
export class Bank {
  id: string;
  description: string;
  gl: string | null;
  account: string | null;
  serialNumber: string | null;
}

