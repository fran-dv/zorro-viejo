import type { Order } from "@/models";
import { formatPrice } from "@/utils";

export interface FormattedOrder extends Order {
  formattedCreatedAt: string;
  formattedTotalPrice: string;
}

export const formatOrders = (orders: Order[]): FormattedOrder[] => {
  return orders.map((order) => {
    return {
      ...order,
      formattedTotalPrice: formatPrice(order.totalPrice),
      formattedCreatedAt: new Date(order.createdAt).toLocaleString(),
    };
  });
};
