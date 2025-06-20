import { Navigate, Route } from "react-router-dom";
import { AdminLogin, Cart, Home, Products } from "@/pages/public";
import { AdminGuard, Paths } from "@/routing";
import { PrivateRouter, RoutesWithNotFound } from "@/routing";

export const AppRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={Paths.Home} />} />
      <Route path={Paths.Home} element={<Home />} />
      <Route path={Paths.Products} element={<Products />} />
      <Route path={Paths.Cart} element={<Cart />} />
      <Route path={Paths.AdminLogin} element={<AdminLogin />} />
      <Route element={<AdminGuard />}>
        <Route index path={Paths.AnyAdmin} element={<PrivateRouter />} />
        <Route path={Paths.AdminDashboard} element={<PrivateRouter />} />
      </Route>
    </RoutesWithNotFound>
  );
};
