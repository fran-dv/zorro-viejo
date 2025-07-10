import { useMutation } from "@tanstack/react-query";
import {
  createOrder,
  type CreateOrderOpts,
  type CreateOrderResponse,
} from "@/api";

export const useSubmitOrder = () => {
  return useMutation({
    mutationKey: ["submit-order"],
    mutationFn: ({ rawOrder, rawOrderItems }: CreateOrderOpts) =>
      createOrder({ rawOrder, rawOrderItems }),
    onSuccess: (createOrderResponse: CreateOrderResponse) => {
      if (!createOrderResponse.success) {
        throw new Error("Failed to create order");
      }
      localStorage.setItem("existingOrderId", createOrderResponse.orderId);
    },
    onError: (error) => {
      console.error("Error al crear la orden:", error.message);
    },
  });
};
