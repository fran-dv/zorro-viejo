import { Route } from "react-router-dom";
import { Paths } from "@/routing/paths";
import { Home } from "@/pages/public/Home/Home";
import { Products } from "@/pages/public/Products/Products";
import { ProductDetail } from "@/pages/public/ProductDetail/ProductDetail";
import { Cart } from "@/pages/public/Cart/Cart";
import { Checkout } from "@/pages/public/Checkout/Checkout";
import { CheckoutSuccess } from "@/pages/public/CheckoutSuccess/CheckoutSuccess";
import { Navigate } from "react-router-dom";
import { RoutesWithNotFound } from "./RoutesWithNotFound";

export const PublicRoutes = () => {
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
    </RoutesWithNotFound>
  );
};

export default PublicRoutes;
