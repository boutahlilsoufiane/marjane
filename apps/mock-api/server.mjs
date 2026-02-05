import { createServer } from "@mswjs/http-middleware";
import { fromOpenApi } from "@msw/source/open-api";
import { readFile } from "node:fs/promises";
import { resolve } from "node:path";

const port = process.env.PORT ?? 3001;
const specPath = resolve(process.cwd(), "../../packages/api-spec/cart.json");

async function start() {
  const specRaw = await readFile(specPath, "utf8");
  const spec = JSON.parse(specRaw);
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
