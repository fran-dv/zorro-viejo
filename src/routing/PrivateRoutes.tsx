import { RelativeAdminPaths } from "@/routing/paths";
import { Route, Navigate } from "react-router-dom";
import { AdminGuard } from "@/routing/AdminGuard";
import { AdminDashboard } from "@/pages/private/Admin/AdminDashboard/AdminDashboard";
import { OrderDetail } from "@/pages/private/Admin/OrderDetail/OrderDetail";
import { AdminLogin } from "@/pages/public/AdminLogin/AdminLogin";
import { OrdersList } from "@/pages/private/Admin/OrdersList/OrderList";
import { ProductsList } from "@/pages/private/Admin/ProductsList/ProductList";
import { RoutesWithNotFound } from "./RoutesWithNotFound";
import { CreateProduct } from "@/pages/private/Admin/CreateProduct/CreateProduct";
import { EditProduct } from "@/pages/private/Admin/EditProduct/EditProduct";

export const PrivateRoutes = () => {
  return (
    <RoutesWithNotFound>
      <Route path={RelativeAdminPaths.Login} element={<AdminLogin />} />

      <Route element={<AdminGuard />}>
        <Route
          index
          element={<Navigate to={RelativeAdminPaths.Dashboard} replace />}
        />
        <Route
          path={RelativeAdminPaths.Dashboard}
          element={<AdminDashboard />}
        />
        <Route
          path={RelativeAdminPaths.ProductsList}
          element={<ProductsList />}
        />
        <Route
          path={RelativeAdminPaths.CreateProduct}
          element={<CreateProduct />}
        />
        <Route
          path={RelativeAdminPaths.EditProduct}
          element={<EditProduct />}
        />
        <Route
          path={RelativeAdminPaths.OrderDetail}
          element={<OrderDetail />}
        />
        <Route path={RelativeAdminPaths.OrdersList} element={<OrdersList />} />
      </Route>
    </RoutesWithNotFound>
  );
};

export default PrivateRoutes;
