export const Paths = {
  Home: "/home",
  Products: "/products",
  ProductDetail: "/products/:slug",
  Cart: "/cart",
  AdminLogin: "/admin/login",
  AnyAdmin: "/admin/*",
  AdminDashboard: "dashboard",
  NotFound: "/404",
  getProductDetailPath: (slug: string) => `/products/${slug}`,
};
