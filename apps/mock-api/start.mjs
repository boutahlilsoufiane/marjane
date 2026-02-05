import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const port = process.env.PORT ?? "3001";
const specPath = resolve(__dirname, "../../packages/api-spec/openapi.yaml");
const prismBin = resolve(
  __dirname,
  "../../node_modules/.bin/prism" + (process.platform === "win32" ? ".cmd" : ""),
);
const isWin = process.platform === "win32";
const command = isWin ? "cmd" : prismBin;
const args = isWin
  ? ["/c", prismBin, "mock", specPath, "--port", port]
  : ["mock", specPath, "--port", port];

const child = spawn(
  command,
  args,
  {
    stdio: "inherit",
  },
);

child.on("exit", (code) => {
  process.exit(code ?? 0);
});
