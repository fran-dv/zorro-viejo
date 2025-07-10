import type { Product } from "@/models";
import { z } from "zod";
import { ProductSchema } from "@/models";

const Product: z.ZodType<Product> = ProductSchema;

export const CartItemSchema = z.object({
  id: z.number(),
  amount: z.number(),
  product: Product,
});

export type CartItem = z.infer<typeof CartItemSchema>;
