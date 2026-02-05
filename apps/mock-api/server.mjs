import { createServer } from "@mswjs/http-middleware";
import { http, HttpResponse } from "msw";

const port = process.env.PORT ?? 3001;

const handlers = [
  http.get("/cart", () =>
    HttpResponse.json({
      items: [
        { id: 1, name: "Laptop", price: 999, quantity: 1 },
        { id: 2, name: "Mouse", price: 29, quantity: 2 },
      ],
      total: 1057,
    }),
  ),
];

const server = createServer(...handlers);

server.listen(port, () => {
  console.log(`Mock API running at http://localhost:${port}`);
});
