import { useCallback, useEffect, useState } from "react";
import { existingOrderIdKey, existingOrderTimeStampKey } from "@/utils";
import { useCartStore } from "@/stores";
import { useLocation } from "react-router-dom";

interface ExistingOrderController {
  isOrderActive: boolean;
  deleteOrder: () => void;
  checkExistingOrderValidity: () => boolean;
  orderId: string | null;
}

const ORDER_EXPIRATION_TIME = 15 * 60 * 1000; // expires in 15 minutes
export const useExistingOrder = (): ExistingOrderController => {
  const { clearCart } = useCartStore();
  const [isOrderActive, setIsOrderActive] = useState(false);
  const [orderId, setOrderId] = useState(
    localStorage.getItem(existingOrderIdKey),
  );
  const location = useLocation();

  const deleteOrder = useCallback(() => {
    localStorage.removeItem(existingOrderIdKey);
    localStorage.removeItem(existingOrderTimeStampKey);
    clearCart();
    setIsOrderActive(false);
    setOrderId(null);
  }, [clearCart]);

  const checkExistingOrderValidity = useCallback(() => {
    const tsString = localStorage.getItem(existingOrderTimeStampKey);
    const orderId = localStorage.getItem(existingOrderIdKey);
    if (!tsString || !orderId) {
      setOrderId(null);
      setIsOrderActive(false);
      return false;
    }
    const createdAt = new Date(tsString);
    const now = new Date();

    if (
      isNaN(createdAt.getTime()) ||
      now.getTime() - createdAt.getTime() > ORDER_EXPIRATION_TIME
    ) {
      deleteOrder();
      return false;
    }

    setOrderId(orderId);
    setIsOrderActive(true);
    return true;
  }, [deleteOrder]);

  useEffect(() => {
    checkExistingOrderValidity();
    const intervalId = window.setInterval(
      checkExistingOrderValidity,
      60 * 1000,
    );
    return () => {
      clearInterval(intervalId);
    };
  }, [checkExistingOrderValidity, location.pathname]);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => {
      if (e.key === existingOrderIdKey || e.key === existingOrderTimeStampKey) {
        checkExistingOrderValidity();
      }
    };
    window.addEventListener("storage", onStorage);

    return () => {
      window.removeEventListener("storage", onStorage);
    };
  }, [checkExistingOrderValidity]);

  return {
    isOrderActive,
    deleteOrder,
    checkExistingOrderValidity,
    orderId,
  };
};
