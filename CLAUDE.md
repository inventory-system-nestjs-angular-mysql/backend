# ISX Inventory Management System — Project Context

## Project Structure

```
ISX-BE/
├── inventory_management_backend/   # NestJS backend
└── inventory_management_frontend/  # Angular frontend
```

---

## Backend (NestJS)

### Architecture — Clean Architecture with 3 layers

```
src/
├── core/                   # Domain layer (entities, repository interfaces, tokens)
├── infrastructure/         # Persistence layer (TypeORM entities, repo implementations, services)
│   ├── config/
│   │   └── database.config.ts   # TypeORM config — synchronize: false (NEVER change to true)
│   └── persistence/
│       ├── bank/
│       ├── brand/
│       ├── city/
│       ├── currency/
│       ├── customer/
│       ├── entity/          # Shared entity table for supplier + customer (nENTsupp/nENTcust)
│       ├── invoice/
│       ├── salesman/
│       ├── stock/
│       ├── stockgroup/
│       ├── supplier/
│       ├── unit/
│       └── warehouse/
└── presentation/           # Controllers, DTOs, modules
```

### Key Design Patterns

- **Repository pattern**: Each module has an interface in `core/` and implementation in `infrastructure/`
- **Injection tokens**: Repositories injected via string tokens (e.g. `STOCK_REPOSITORY`, `INVOICE_REPOSITORY`)
- **Validation**: `BadRequestException` with count message before deleting any entity referenced elsewhere (no DB FK constraints — all FK validation is done in code)
- **Module registration**: Every TypeORM entity used in a module must be added to that module's `TypeOrmModule.forFeature([...])` AND to `database.config.ts` entities array

### Database

- **MySQL**, database: `eisdata`
- **`synchronize: false`** — legacy database, DO NOT enable synchronize. Adding a new column: write SQL first, then add `@Column()` to the entity
- **Shared entity table**: Supplier and Customer both live in the `entity` table. Supplier: `nENTsupp = 1`, Customer: `nENTcust = 1`
- Column names use the legacy naming convention (e.g. `cENTpk`, `nIVDAmount`, `cSTDfkSTK`)
- TypeORM QueryBuilder property names are **case-sensitive** — always match the entity property name exactly (e.g. `nIVDAmount` not `nIVDamount`)

### Modules

| Module | Notes |
|--------|-------|
| stock | Stock items + stock details (units/barcodes). `nSTKbuy` = local purchase price, `nSTKxbuy` = USD purchase price |
| stockgroup | Stock groups/categories |
| brand | Optional on stock. Validated before delete via `countByBrandId` |
| unit | Units of measurement |
| invoice | Handles supplier invoices, customer invoices, and stock opening balance. `ENTITY_PK_OPENING` constant for opening balance entity |
| entity | Shared persistence for supplier + customer |
| supplier | `nENTsupp = 1` in entity table |
| customer | `nENTcust = 1` in entity table. `cENTfkSAL` = salesman FK (optional) |
| salesman | Validated before delete: checks invoices (`cINVfkSAM`) + customers (`cENTfkSAL`) |
| currency | `rate = 1` means local currency, `rate != 1` means foreign/USD |
| warehouse | Warehouses |
| city | Cities |
| bank | Banks |
| upload | File/image uploads |

### Transactions vs Masters

- **Masters** live in `src/app/masters/` and `src/presentation/<module>/` — reference data
- **Transactions** live in `src/app/transactions/` and `src/presentation/<module>/` — operational records

---

### Purchasing (`cINVspecial = 'BL'`)

- Backend: `src/presentation/purchasing/` + `src/infrastructure/persistence/purchasing/` + `src/core/purchasing/`
- Uses `invoice` + `invoicedetail` tables (same as opening balance), filtered by `cINVspecial = 'BL'`
- `PURCHASING_REPOSITORY` token (defined in `core/purchasing/repositories/purchasing.repository.interface.ts`)
- Amount formula: `qty × price × (1-disc1/100) × (1-disc2/100) × (1-disc3/100) - disc`
- Frontend: `src/app/transactions/purchasing/` — list view + edit dialog with header + detail lines

---

### Stock Opening Balance

- Uses a special `ENTITY_PK_OPENING` entity PK
- Invoice header stored in `invoice` table, lines in `invoicedetail` table
- `dINVtglsj = new Date()` only for opening balance (not supplier/customer invoices)
- Amount is in detail lines (`nIVDAmount`) — use `sumAmountsByInvoiceIds()` to get totals per invoice
- Stock detail identified by combination of `cIVDfkSTK + cIVDcode` (maps to `cSTDfkSTK + cSTDcode`)
- `civdid1` is intentionally left empty (`' '`)
- On-hand: uses `nIVDzqtyin` / `nIVDzqtyout` (z-qty = factored quantities, NOT `nIVDqtyin/nIVDqtyout`)

### FK Delete Validation Pattern

```typescript
const count = await this.xRepository.countByYId(id);
if (count > 0) throw new BadRequestException(`Cannot delete X because it is referenced by ${count} Y(s).`);
```

Apply this pattern whenever a master entity could be referenced by another table (brand→stock, salesman→invoice/customer, city→customer, etc.).

---

## Frontend (Angular)

### Structure

```
src/app/
├── core/
│   ├── constants/api-endpoints.constants.ts
│   ├── models/          # TypeScript interfaces matching backend DTOs
│   └── services/base-api.service.ts
└── masters/
    ├── bank/
    ├── brand/
    ├── city/
    ├── currency/
    ├── customer/
    ├── salesman/
    ├── stock/
    ├── stock-opening-balance/
    ├── stockgroup/
    ├── supplier/
    ├── unit/
    └── warehouse/
```

### Key Conventions

- **Angular standalone components** with signals (`signal<T>([])`)
- **PrimeNG** UI components (`p-table`, `p-dialog`, `p-select`, `p-inputnumber`, `p-datepicker`, etc.)
- `ConfirmationService` used for destructive actions (delete)
- `MessageService` / `p-toast` for notifications
- All services extend `BaseApiService`

### Important Frontend Rules

- Stock codes and invoice numbers are always **uppercase** — applied via `(input)` handlers on text inputs
- Currency dropdown disabled when lines > 0 in stock opening balance
- Currency must be selected before adding a stock line (validated via `validateCurrencySelected()`)
- Price selection: `currency.rate !== 1` → use `purchaseX` (USD), else use `purchase` (local)
- Barcode scan support: stock code `(blur)` handler looks up stock in loaded signal and auto-populates row

### Stock Opening Balance Specifics

- `getStockPrice(detail)`: returns `purchaseX` if `currency.rate !== 1`, else `purchase`
- `onStockCodeBlur(index)`: looks up code in `stockDetails()` signal on blur
- `deleteRecord()`: uses `ConfirmationService`, visible only when `currentRecordId` is set

---

## Naming Conventions (Legacy DB)

| Prefix | Meaning |
|--------|---------|
| `c` | char/varchar |
| `n` | numeric |
| `d` | date |
| `pk` suffix | primary key |
| `fk` in name | foreign key reference |
| `ENT` | entity (supplier/customer) |
| `INV` | invoice |
| `IVD` | invoice detail |
| `STK` | stock |
| `STD` | stock detail |
| `SAM` | salesman |
| `SAL` | salesman (FK ref in entity table) |
| `CIT` | city |
| `WAR` | warehouse |
| `CUR` | currency |
