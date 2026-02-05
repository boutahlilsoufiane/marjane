# Mock API (Prism)

Local mock API powered by Stoplight Prism (using the shared OpenAPI spec).

## Run

```sh
yarn workspace mock-api start
```

The server listens on `http://localhost:3001` by default. Set `PORT` to override (e.g., `PORT=4000 yarn workspace mock-api start`).

## Routes

- `GET /cart` → sample cart payload:
  ```json
  {
    "items": [
      { "id": 1, "name": "Laptop", "price": 999, "quantity": 1 },
      { "id": 2, "name": "Mouse", "price": 29, "quantity": 2 }
    ],
    "total": 1057
  }
  ```
