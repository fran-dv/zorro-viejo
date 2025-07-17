import {
  existingOrderIdKey,
  existingOrderTimeStampKey,
} from "./localStorageKeys";

export const removeOrderFromLocalStorage = () => {
  localStorage.removeItem(existingOrderIdKey);
  localStorage.removeItem(existingOrderTimeStampKey);
};
