import { writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { generateOpenApi } from "@ts-rest/open-api";
import { contract } from "../contract";

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  const openApiDocument = generateOpenApi(contract, {
    info: {
      title: "Simple Cart API",
      version: "1.0.0",
    },
    servers: [{ url: "http://localhost:3001" }],
  });

  const outPath = resolve(__dirname, "../cart.json");
  await writeFile(outPath, JSON.stringify(openApiDocument, null, 2), "utf8");
  console.log(`OpenAPI written to ${outPath}`);
}

main().catch((error) => {
  console.error("Failed to generate OpenAPI", error);
  process.exit(1);
});
