import { z } from "zod";
import { ProductSchema } from "@/models";

export const CartItemSchema = z.object({
  id: z.number(),
  amount: z.number(),
  product: ProductSchema,
});

export type CartItem = z.infer<typeof CartItemSchema>;
