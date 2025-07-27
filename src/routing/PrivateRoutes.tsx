import { RelativeAdminPaths } from "@/routing/paths";
import { Route, Routes } from "react-router-dom";
import { AdminGuard } from "@/routing/AdminGuard";
import { AdminDashboard } from "@/pages/private/Admin/AdminDashboard/AdminDashboard";
import { OrderDetail } from "@/pages/private/Admin/OrderDetail/OrderDetail";
import { AdminLogin } from "@/pages/public/AdminLogin/AdminLogin";
import { Navigate } from "react-router-dom";

export const PrivateRoutes = () => {
  return (
    <Routes>
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
          element={<AdminDashboard />}
        />
        <Route
          path={RelativeAdminPaths.CreateProduct}
          element={<AdminDashboard />}
        />
        <Route
          path={RelativeAdminPaths.EditProduct}
          element={<AdminDashboard />}
        />
        <Route
          path={RelativeAdminPaths.OrderDetail}
          element={<OrderDetail />}
        />
        <Route
          path={RelativeAdminPaths.OrdersList}
          element={<AdminDashboard />}
        />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;
