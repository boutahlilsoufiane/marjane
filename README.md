# Marjane Monorepo

Minimal monorepo with a mock API service and shared API specification.

## Apps and packages

- `mock-api`: local mock HTTP API powered by MSW + `@msw/source` (runtime handlers from the OpenAPI spec).
- `@repo/api-spec`: OpenAPI spec (`packages/api-spec/cart.json`) describing the Simple Cart API.
- `@repo/ts-rest`: placeholder package for ts-rest.

## Prerequisites

- Node.js 18+
- Yarn Classic (`yarn@1.x`)

## Install

```sh
yarn install
```

## Run the mock API

```sh
yarn workspace mock-api start
```

- Default port: `3001`. Override with `PORT=4000 yarn workspace mock-api start`.
- Uses MSW with `@msw/source` to generate handlers at runtime from `packages/api-spec/cart.json`.
- Example request: `curl http://localhost:3001/cart`

## Generate OpenAPI from ts-rest contract

```sh
yarn workspace ts-rest openapi
```

This writes `packages/ts-rest/cart.json`. Update consumers (e.g., `mock-api/server.mjs`) if you prefer to use the generated spec.

## API spec

- Location: `packages/api-spec/cart.json`
- Current endpoint: `GET /cart` returns an object with required `items` (array of { id, name, price, quantity }) and `total` (number).
