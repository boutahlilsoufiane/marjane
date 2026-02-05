# Mock API (MSW)

Local mock API powered by `@mswjs/http-middleware` and `msw`.

## Run

```sh
yarn workspace mock-api start
```

The server listens on `http://localhost:3001` by default. Set `PORT` to override.

## Routes

- `GET /health` → `{ status: "ok" }`
- `GET /users/:id` → `{ id, name }`
- `POST /auth/login` → `{ token, email, expiresIn }`
