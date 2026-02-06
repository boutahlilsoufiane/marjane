import { createServer } from "@mswjs/http-middleware";
import { fromOpenApi } from "@msw/source/open-api";
import { createRequire } from "node:module";


const port = process.env.PORT ?? 3001;
const require = createRequire(import.meta.url);
//const spec = require("../../packages/api-spec/cart.json");
const spec = require("../../packages/ts-rest/cart.json");

async function start() {
  const handlers = await fromOpenApi(spec);
  const server = createServer(...handlers);

  server.listen(port, () => {
    console.log(`Mock API running at http://localhost:${port}`);
  });
}

start().catch((error) => {
  console.error("Failed to start mock API", error);
  process.exit(1);
});
