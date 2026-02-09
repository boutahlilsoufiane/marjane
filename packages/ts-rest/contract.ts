import { initContract } from "@ts-rest/core";
import { z } from "zod";

const c = initContract();

const cartItemSchema = z.object({
  id: z.number().int().nonnegative(),
  name: z.string(),
  price: z.number(),
  quantity: z.number().int().nonnegative(),
});

const cartSchema = z.object({
  items: z.array(cartItemSchema),
  total: z.number(),
});

export const contract = c.router({
  cart: {
    method: "GET",
    path: "/cart",
    summary: "Get cart",
    responses: {
      200: cartSchema,
    },
  },
});

export default contract