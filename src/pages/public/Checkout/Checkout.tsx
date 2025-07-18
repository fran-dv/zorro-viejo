import { Outlet } from "react-router-dom";
import styles from "./Checkout.module.css";
import { CheckoutForm } from "@/pages/public";
import { Paths } from "@/routing";
import { existingOrderIdKey, generateRawOrderToInsert } from "@/utils";
import { useNavigate } from "react-router-dom";
import type {
  CheckoutFormValues,
  OrderCreate,
  OrderItemCreate,
} from "@/models";
import { useEffect } from "react";
import { useSubmitOrder } from "@/hooks";
import { useCartStore } from "@/stores";
import { generateRawOrderItemsToInsert } from "@/utils";
import { TriangleAlert } from "lucide-react";

export const Checkout = () => {
  const navigate = useNavigate();
  const { items: cartItems } = useCartStore();
  const { mutate, isPending, isError, error } = useSubmitOrder();
  const existingOrderId = localStorage.getItem(existingOrderIdKey);
  useEffect(() => {
    if (existingOrderId) {
      navigate(Paths.getCheckoutSuccessPath(existingOrderId));
    }
  }, [existingOrderId, navigate]);

  const handleFormSubmit = (formData: CheckoutFormValues) => {
    const orderData: OrderCreate = generateRawOrderToInsert(formData);
    const orderItemsData: OrderItemCreate[] = generateRawOrderItemsToInsert(
      orderData.id,
      cartItems,
    );

    mutate(
      { rawOrder: orderData, rawOrderItems: orderItemsData },
      {
        onSuccess: () => {
          setTimeout(
            () => navigate(Paths.getCheckoutSuccessPath(orderData.id)),
            5000,
          );
        },
      },
    );

    if (error) {
      console.error(error.message);
      throw error;
    }
  };

  return (
    <div className={styles.container}>
      <h1>Tu orden</h1>

      {isError && (
        <div className={styles.errorContainer}>
          <TriangleAlert className={styles.icon} />
          <p className={styles.errorText}>
            😕 Error: Hubo problemas al crear la orden. Revisa tu conexión a
            internet y vuelve a intentarlo.
          </p>
        </div>
      )}

      {!existingOrderId ? (
        <CheckoutForm onSubmit={handleFormSubmit} isSubmitting={isPending} />
      ) : (
        <Outlet />
      )}
    </div>
  );
};
