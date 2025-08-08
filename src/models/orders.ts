import { z } from "zod";
import { ProductSchema, RawProductResponseSchema } from "@/models";

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
  product: RawProductResponseSchema,
});
export type OrderItemResponse = z.infer<typeof OrderItemResponseSchema>;

export const RawOrderResponseSchema = z.object({
  id: z.string(),
  customer_name: z.string().min(3).trim(),
  order_items: z.array(OrderItemResponseSchema),
  created_at: z.string(),
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
      product: ProductSchema.parse(item.product),
      amount: item.amount,
    };
  });

  const totalPrice = items.reduce((total, item) => {
    const offerPrice = item.product.offerPrice ?? 0;
    const price = offerPrice > 0 ? offerPrice : item.product.price;
    return total + price * item.amount;
  }, 0);

  return {
    id: raw.id,
    customerName: raw.customer_name,
    items,
    totalPrice,
    createdAt: raw.created_at,
  };
});
export type Order = z.infer<typeof OrderSchema>;
