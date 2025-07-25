import { Navigate, Route } from "react-router-dom";
import {
  AdminDashboard,
  AdminLogin,
  Cart,
  Checkout,
  CheckoutSuccess,
  Home,
  OrderDetail,
  ProductDetail,
  Products,
} from "@/pages";
import {
  AdminGuard,
  Paths,
  RelativeAdminPaths,
  RoutesWithNotFound,
} from "@/routing";

export const AppRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={Paths.Home} />} />
      <Route path={Paths.Home} element={<Home />} />
      <Route path={Paths.Products} element={<Products />} />
      <Route path={Paths.ProductDetail} element={<ProductDetail />} />
      <Route path={Paths.Cart} element={<Cart />} />
      <Route path={Paths.Checkout} element={<Checkout />}>
        <Route path={Paths.CheckoutSuccess} element={<CheckoutSuccess />} />
      </Route>
      <Route path={Paths.AdminLogin} element={<AdminLogin />} />

      <Route path={Paths.AnyAdmin} element={<AdminGuard />}>
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
    </RoutesWithNotFound>
  );
};
