# Mock API (MSW)

Local mock API powered by MSW and `@msw/source`, generating handlers at runtime from the shared OpenAPI spec JSON.

## Run

```sh
yarn workspace mock-api start
```

The server listens on `http://localhost:3001` by default. Set `PORT` to override (e.g., `PORT=4000 yarn workspace mock-api start`).

## Routes

- `GET /cart` → returns an object with required `items` (array of `{ id, name, price, quantity }`) and `total` (number). The handlers are generated at runtime from `packages/api-spec/cart.json`.
