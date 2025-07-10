import type {
  CartItem,
  CheckoutFormValues,
  OrderCreate,
  OrderItemCreate,
} from "@/models";
import { nanoid } from "nanoid";

export const generateRawOrderToInsert = (
  formData: CheckoutFormValues,
): OrderCreate => {
  const orderId = `${Date.now().toString().slice(-3)}${nanoid(3).toUpperCase()}`;
  return {
    id: orderId,
    customer_name: formData.fullName,
  };
};

export const generateRawOrderItemsToInsert = (
  orderId: string,
  items: CartItem[],
): OrderItemCreate[] => {
  const orderCreateItems: OrderItemCreate[] = items.map((item) => {
    return {
      order_id: orderId,
      product_id: item.product.id,
      amount: item.amount,
    };
  });

  return orderCreateItems;
};
