# API Examples

## Base URL
```
http://localhost:3000/api
```

## StockGroup Endpoints

### 1. Create StockGroup
**POST** `/stockgroups`

**Request Body:**
```json
{
  "cGRPdesc": "Electronics Group",
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

**Response (201 Created):**
```json
{
  "cGRPpk": "V1a2b3C4d5E6f7G8h9I0Jk",
  "cGRPdesc": "Electronics Group",
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

### 2. Get All StockGroups
**GET** `/stockgroups`

**Response (200 OK):**
```json
[
  {
    "cGRPpk": "V1a2b3C4d5E6f7G8h9I0Jk",
    "cGRPdesc": "Electronics Group",
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
]
```

### 3. Get StockGroup by ID
**GET** `/stockgroups/V1a2b3C4d5E6f7G8h9I0Jk`

**Response (200 OK):**
```json
{
  "cGRPpk": "V1a2b3C4d5E6f7G8h9I0Jk",
  "cGRPdesc": "Electronics Group",
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

**Error Response (404 Not Found):**
```json
{
  "statusCode": 404,
  "message": "StockGroup with cGRPpk 'V1a2b3C4d5E6f7G8h9I0Jk' not found",
  "error": "Not Found"
}
```

### 4. Update StockGroup
**PATCH** `/stockgroups/V1a2b3C4d5E6f7G8h9I0Jk`

**Request Body (partial update):**
```json
{
  "cGRPdesc": "Updated Electronics Group",
  "ngrpqty": 150
}
```

**Response (200 OK):**
```json
{
  "cGRPpk": "V1a2b3C4d5E6f7G8h9I0Jk",
  "cGRPdesc": "Updated Electronics Group",
  "serino": "SER001",
  "markrp1": 1000.50,
  "markpersen1": 10.00,
  "markrp2": 2000.00,
  "markpersen2": 15.00,
  "ngrpnilai": 50000,
  "ngrpdollar": 5000,
  "cgrpkep": "KEP1",
  "ngrpqty": 150
}
```

### 5. Delete StockGroup
**DELETE** `/stockgroups/V1a2b3C4d5E6f7G8h9I0Jk`

**Response (204 No Content):**
(No response body)

**Error Response (404 Not Found):**
```json
{
  "statusCode": 404,
  "message": "StockGroup with cGRPpk 'V1a2b3C4d5E6f7G8h9I0Jk' not found",
  "error": "Not Found"
}
```

## Error Responses

### Validation Error (400 Bad Request)
```json
{
  "statusCode": 400,
  "message": [
    "cGRPdesc should not be empty"
  ],
  "error": "Bad Request"
}
```

### Conflict Error (409 Conflict)
```json
{
  "statusCode": 409,
  "message": "StockGroup with description 'Electronics Group' already exists",
  "error": "Conflict"
}
```

## cURL Examples

### Create
```bash
curl -X POST http://localhost:3000/api/stockgroups \
  -H "Content-Type: application/json" \
  -d '{
    "cGRPdesc": "Electronics Group",
    "ngrpqty": 100
  }'
```

### Get All
```bash
curl http://localhost:3000/api/stockgroups
```

### Get One
```bash
curl http://localhost:3000/api/stockgroups/V1a2b3C4d5E6f7G8h9I0Jk
```

### Update
```bash
curl -X PATCH http://localhost:3000/api/stockgroups/V1a2b3C4d5E6f7G8h9I0Jk \
  -H "Content-Type: application/json" \
  -d '{
    "cGRPdesc": "Updated Description",
    "ngrpqty": 150
  }'
```

### Delete
```bash
curl -X DELETE http://localhost:3000/api/stockgroups/V1a2b3C4d5E6f7G8h9I0Jk
```

