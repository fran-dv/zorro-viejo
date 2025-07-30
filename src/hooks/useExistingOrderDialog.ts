import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useExistingOrder } from "./useExistingOrder";
import { Paths } from "@/routing";
import { useNavigate } from "react-router-dom";

interface OrderDialogController {
  openOrderDialog: boolean;
  setOpenOrderDialog: (open: boolean) => void;
  orderId: string | null;
  onCancelOrder: () => void;
  onContinueOrder: () => void;
  orderDialogRoutes: boolean;
}

export const useExistingOrderDialog = (): OrderDialogController => {
  const navigate = useNavigate();
  const [openOrderDialog, setOpenOrderDialog] = useState(false);
  const { pathname } = useLocation();
  const { isOrderActive, deleteOrder, orderId, checkExistingOrderValidity } =
    useExistingOrder();

  useEffect(() => {
    if (!isOrderActive) {
      setOpenOrderDialog(false);
    }
    if (isOrderActive) {
      setOpenOrderDialog(true);
    }
  }, [isOrderActive, pathname, orderId]);

  const handleCancelOrder = () => {
    deleteOrder();
    checkExistingOrderValidity();
    setOpenOrderDialog(false);
  };

  const handleContinueOrder = () => {
    navigate(Paths.getCheckoutSuccessPath(orderId!));
  };

  const orderDialogRoutes =
    pathname.startsWith(Paths.Home) ||
    pathname.startsWith(Paths.Products) ||
    pathname.startsWith(Paths.Cart);

  return {
    openOrderDialog,
    setOpenOrderDialog,
    orderId,
    onCancelOrder: handleCancelOrder,
    onContinueOrder: handleContinueOrder,
    orderDialogRoutes,
  };
};
