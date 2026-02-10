import { defineConfig } from "orval";

export default defineConfig({
  cart: {
    input: "../../packages/ts-rest/cart.json",
    output: {
      target: "./lib/orval.ts",
      client: "react-query",
      httpClient: "fetch",
       baseUrl: {
        getBaseUrlFromSpecification: true,
      },
    }
},
});
