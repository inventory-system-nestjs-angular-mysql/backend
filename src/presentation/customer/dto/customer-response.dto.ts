/**
 * Presentation Layer DTO - HTTP Response DTO for Customer
 */
export class CustomerResponseDto {
  id: string;
  code: string;
  name: string;
  cityId?: string | null;
  address1?: string | null;
  address2?: string | null;
  address3?: string | null;
  address4?: string | null;
  address5?: string | null;
  npwp?: string | null; // TIN
  nppkp?: string | null; // Legacy TIN
  creditLimit?: number;
  outstandingLimit?: number;
  discount?: number;
  term?: number;
  billToSame?: boolean;
  billToName?: string | null;
  billToAddress1?: string | null;
  billToAddress2?: string | null;
  billToAddress3?: string | null;
  billToAddress4?: string | null;
  createDate?: string | null;
  lastDate?: string | null;
  isSuspended?: boolean;
  memo?: string | null;
  imagePath?: string | null;
  visitFrequency?: number | null;
  email?: string | null;
  email2?: string | null;
  email3?: string | null;
  zip?: string | null;
  telephone?: string | null;
  birthday?: string | null;
  religion?: string | null;
  distance?: number | null;
  freight?: number | null;
  priceType?: number | null; // 1=ISX, 2=POSX, 3=All
  salesmanId?: string | null;
  gender?: number | null; // 0=Male, 1=Female
  nik?: string | null;
}

