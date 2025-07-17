import { useEffect } from "react";
import { existingOrderIdKey, existingOrderTimeStampKey } from "@/utils";
import { useCartStore } from "@/stores";

const ORDER_EXPIRATION_TIME = 25 * 60 * 1000; // expires in 25 minutes
export const useExpireOrderStorage = () => {
  const { clearCart } = useCartStore();
  useEffect(() => {
    const tsString = localStorage.getItem(existingOrderTimeStampKey);
    if (!tsString) return;

    const createdAt = new Date(tsString);
    const now = new Date();

    if (
      isNaN(createdAt.getTime()) ||
      now.getTime() - createdAt.getTime() > ORDER_EXPIRATION_TIME
    ) {
      localStorage.removeItem(existingOrderIdKey);
      localStorage.removeItem(existingOrderTimeStampKey);
      clearCart();
    }
  }, [clearCart]);
};
