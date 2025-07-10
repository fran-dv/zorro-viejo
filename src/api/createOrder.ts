import type { OrderCreate, OrderItemCreate } from "@/models";
import { supabase, Tables } from "@/api";

export interface CreateOrderOpts {
  rawOrder: OrderCreate;
  rawOrderItems: OrderItemCreate[];
}

export interface CreateOrderResponse {
  orderId: string;
  success: boolean;
}

export const createOrder = async ({
  rawOrder,
  rawOrderItems,
}: CreateOrderOpts): Promise<CreateOrderResponse> => {
  const { error, status } = await supabase
    .from(Tables.Orders)
    .insert(rawOrder)
    .single();

  if (error) throw error;

  const { error: orderItemsError } = await supabase
    .from(Tables.OrderItems)
    .insert(rawOrderItems);

  if (orderItemsError) throw orderItemsError;

  return {
    orderId: rawOrder.id,
    success: status === 201,
  };
};
