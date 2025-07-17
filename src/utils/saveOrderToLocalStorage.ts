import type { CreateOrderResponse } from "@/api";
import {
  existingOrderIdKey,
  existingOrderTimeStampKey,
} from "./localStorageKeys";

export const saveOrderToLocalStorage = (
  createOrderResponse: CreateOrderResponse,
) => {
  localStorage.setItem(existingOrderIdKey, createOrderResponse.orderId);
  localStorage.setItem(existingOrderTimeStampKey, new Date().toISOString());
};
