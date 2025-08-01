import { Navigate, Outlet } from "react-router-dom";
import styles from "./Checkout.module.css";
import { CheckoutForm } from "@/pages/public";
import { Paths } from "@/routing";
import { generateRawOrderToInsert } from "@/utils";
import { useNavigate } from "react-router-dom";
import type {
  CheckoutFormValues,
  OrderCreate,
  OrderItemCreate,
} from "@/models";
import { useCallback, useEffect } from "react";
import { useExistingOrder, useSubmitOrder } from "@/hooks";
import { useCartStore } from "@/stores";
import { generateRawOrderItemsToInsert } from "@/utils";
import { TriangleAlert } from "lucide-react";

export const Checkout = () => {
  const navigate = useNavigate();
  const { items: cartItems } = useCartStore();
  const { mutate, isPending, isError, error } = useSubmitOrder();
  const { orderId, checkExistingOrderValidity } = useExistingOrder();

  const handleSuccess = useCallback(() => {
    if (!orderId) {
      return;
    }
    navigate(Paths.getCheckoutSuccessPath(orderId));
  }, [navigate, orderId]);

  useEffect(() => {
    if (orderId) {
      handleSuccess();
    }
  }, [orderId, navigate, handleSuccess]);

  if (cartItems.length === 0) {
    return <Navigate to={Paths.Cart} />;
  }

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
          checkExistingOrderValidity();
          handleSuccess();
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

      {!orderId ? (
        <CheckoutForm onSubmit={handleFormSubmit} isSubmitting={isPending} />
      ) : (
        <Outlet />
      )}
    </div>
  );
};
