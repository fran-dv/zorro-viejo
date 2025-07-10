import { z } from "zod";
import { ProductSchema } from "./product";
import { ProductResponseSchema } from "./productResponseSchema";
import { productResponseToProduct } from "./productResponseToProduct";

// API
export const OrderCreateSchema = z.object({
  id: z.string(),
  customer_name: z.string().min(3).trim(),
});
export type OrderCreate = z.infer<typeof OrderCreateSchema>;

export const OrderItemCreateSchema = z.object({
  order_id: z.string(),
  product_id: z.number(),
  amount: z.number().int().min(1),
});
export type OrderItemCreate = z.infer<typeof OrderItemCreateSchema>;

export const OrderItemResponseSchema = z.object({
  amount: z.number().int().min(1),
  product: ProductResponseSchema,
});
export type OrderItemResponse = z.infer<typeof OrderItemResponseSchema>;

export const RawOrderResponseSchema = z.object({
  id: z.string(),
  customer_name: z.string().min(3).trim(),
  order_items: z.array(OrderItemResponseSchema),
});
export type RawOrderResponse = z.infer<typeof RawOrderResponseSchema>;

// Local
export const OrderItemSchema = z.object({
  product: ProductSchema,
  amount: z.number().int().min(1),
});
export type OrderItem = z.infer<typeof OrderItemSchema>;

export const OrderSchema = RawOrderResponseSchema.transform((raw) => {
  // API response to local
  const items: OrderItem[] = raw.order_items.map((item) => {
    return {
      product: productResponseToProduct(item.product),
      amount: item.amount,
    };
  });

  const totalPrice = items.reduce((total, item) => {
    const price = item.product.offerPrice ?? item.product.price;
    return total + price * item.amount;
  }, 0);

  return {
    id: raw.id,
    customerName: raw.customer_name,
    items,
    totalPrice,
  };
});
export type Order = z.infer<typeof OrderSchema>;
