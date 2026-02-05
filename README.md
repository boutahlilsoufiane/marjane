# Marjane Monorepo

Minimal monorepo with a mock API service and shared API specification.

## Apps and packages

- `mock-api`: local mock HTTP API powered by Stoplight Prism.
- `@repo/api-spec`: OpenAPI spec (`packages/api-spec/openapi.yaml`) describing the Simple Cart API.

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
- Uses Stoplight Prism to mock directly from `packages/api-spec/openapi.yaml`.
- Example request: `curl http://localhost:3001/cart`

If you see a Prism spawn error, ensure dependencies are installed (`yarn install`) and retry the command from the repo root.

## API spec

- Location: `packages/api-spec/openapi.yaml`
- Current endpoint: `GET /cart` returns a sample cart with items and total.
