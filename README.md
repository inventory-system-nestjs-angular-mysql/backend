# inventory_management_backend

NestJS backend application with clean architecture for managing stock groups.

## Project Structure

```
src/
├── config/              # Configuration files
│   └── database.config.ts
├── stockgroup/          # StockGroup feature module
│   ├── controllers/     # HTTP controllers
│   ├── services/        # Business logic
│   ├── repositories/    # Data access layer
│   ├── entities/        # TypeORM entities
│   ├── dto/             # Data Transfer Objects
│   └── stockgroup.module.ts
├── app.module.ts        # Root module
└── main.ts              # Application entry point
```

## Prerequisites

- Node.js (v18 or higher)
- MySQL (v8.0 or higher)
- npm or yarn

## Installation

1. Clone the repository
2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file based on `.env.example`:
```bash
cp .env.example .env
```

4. Update the `.env` file with your database credentials:
```env
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=your_password
DB_DATABASE=eisdata
PORT=3000
NODE_ENV=development
```

5. Make sure your MySQL database exists and the `stockgroup` table is created (see SQL script in project documentation)

## Running the Application

### Development
```bash
npm run start:dev
```

### Production
```bash
npm run build
npm run start:prod
```

The application will be available at `http://localhost:3000/api`

## API Endpoints

### StockGroup CRUD Operations

#### Create StockGroup
```http
POST /api/stockgroups
Content-Type: application/json

{
  "cGRPpk": "GRP001",
  "cGRPdesc": "Stock Group 1",
  "serino": "SER001",
  "markrp1": 1000.50,
  "markpersen1": 10.00,
  "markrp2": 2000.00,
  "markpersen2": 15.00,
  "ngrpnilai": 50000,
  "ngrpdollar": 5000,
  "cgrpkep": "KEP1",
  "ngrpqty": 100
}
```

#### Get All StockGroups
```http
GET /api/stockgroups
```

#### Get StockGroup by ID
```http
GET /api/stockgroups/:id
```

#### Update StockGroup
```http
PATCH /api/stockgroups/:id
Content-Type: application/json

{
  "cGRPdesc": "Updated Description",
  "ngrpqty": 150
}
```

#### Delete StockGroup
```http
DELETE /api/stockgroups/:id
```

## Architecture

This project follows **Clean Architecture** principles:

- **Controllers**: Handle HTTP requests and responses
- **Services**: Contain business logic and orchestration
- **Repositories**: Handle data access and database operations
- **Entities**: Represent database tables
- **DTOs**: Define data structures for API requests/responses

## Features

- ✅ Full CRUD operations for StockGroup
- ✅ Input validation using class-validator
- ✅ Error handling with proper HTTP status codes
- ✅ TypeORM for database operations
- ✅ Clean architecture separation of concerns
- ✅ Environment-based configuration
- ✅ CORS enabled for frontend integration

## Database Schema

The `stockgroup` table structure:
- `cGRPpk` (char(23)) - Primary Key
- `cGRPdesc` (varchar(40)) - Unique, Description
- `serino` (varchar(10)) - Serial Number
- `markrp1`, `markrp2` (decimal(15,2)) - Markup amounts
- `markpersen1`, `markpersen2` (decimal(6,2)) - Markup percentages
- `ngrpnilai`, `ngrpdollar` (decimal(15,0)) - Group values
- `cgrpkep` (char(4)) - Group code
- `ngrpqty` (decimal(10,0)) - Quantity (default: 0)

## Development

### Build
```bash
npm run build
```

### Format code
```bash
npm run format
```

## License

ISC

