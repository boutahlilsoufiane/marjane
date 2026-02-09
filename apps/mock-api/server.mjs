import { createServer } from "@mswjs/http-middleware";
import { fromOpenApi } from "@msw/source/open-api";
import { http } from "msw";
import { createRequire } from "node:module";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
  "Access-Control-Allow-Headers": "*",
};

const require = createRequire(import.meta.url);
const spec = require("../../packages/ts-rest/cart.json");
const port = process.env.PORT ?? 3001;

async function start() {
  // Generate handlers from OpenAPI and wrap each to inject CORS headers
  const generatedHandlers = await fromOpenApi(spec);
  const handlers = generatedHandlers.map((handler) => {
    const method = handler.info?.method?.toLowerCase?.();
    const path = handler.info?.path;
    if (!method || !path || typeof http[method] !== "function") {
      return handler;
    }
    const resolver = handler.resolver;
    return http[method](path, async (...args) => {
      const res = await resolver(...args);
      if (res?.headers) {
        Object.entries(corsHeaders).forEach(([key, value]) =>
          res.headers.set(key, value)
        );
      }
      return res;
    });
  });

  // Add an explicit OPTIONS handler for any path
  handlers.unshift(
    http.options("*", () =>
      new Response(null, { status: 204, headers: corsHeaders })
    )
  );

  const server = createServer(...handlers);
  server.listen(port, () => {
    console.log(`Mock API running at http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start mock API", error);
  process.exit(1);
});