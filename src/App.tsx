import styles from "./App.module.css";
import { Navbar } from "@/components/Navbar/Navbar";
import { Footer } from "@/components/Footer/Footer";
import { FooterContextProvider } from "./context/FooterContext";
import { useRef } from "react";
import { useLocation } from "react-router-dom";
import { Paths, RelativeAdminPaths } from "@/routing";
import { ScrollToTop } from "@/components/ScrollToTop/ScrollToTop";
import { useExpireOrderStorage } from "@/hooks";
import { Refine } from "@refinedev/core";
import { dataProvider } from "@refinedev/supabase";
import { supabase } from "@/api";
import { authProvider } from "@/auth";
import { AdminLayout } from "@/components/Admin";
import routerProvider from "@refinedev/react-router";

interface Props {
  children: React.ReactNode;
}

const hideFooterOn = [Paths.Cart];

function App({ children }: Props) {
  const footerRef = useRef<HTMLElement>(null);
  const { pathname } = useLocation();
  const shouldHideFooter = hideFooterOn.includes(pathname);
  useExpireOrderStorage();
  const isAdminRoute =
    pathname.startsWith("/admin") && pathname !== Paths.AdminLogin;

  return (
    <Refine
      routerProvider={routerProvider}
      dataProvider={dataProvider(supabase)}
      authProvider={authProvider}
      resources={[
        {
          name: "products",
          list: RelativeAdminPaths.ProductsList,
          create: RelativeAdminPaths.CreateProduct,
          edit: RelativeAdminPaths.EditProduct,
        },
        {
          name: "orders",
          list: RelativeAdminPaths.OrdersList,
          show: RelativeAdminPaths.OrderDetail,
        },
      ]}
    >
      {!isAdminRoute ? (
        <FooterContextProvider
          value={footerRef as React.RefObject<HTMLElement | null>}
        >
          <ScrollToTop />
          <div className={styles.container}>
            <Navbar />
            <main className={styles.main}>{children}</main>
            {!shouldHideFooter && <Footer ref={footerRef} />}
          </div>
        </FooterContextProvider>
      ) : (
        <>
          <ScrollToTop />
          <AdminLayout>
            <main className={styles.main}>{children}</main>
          </AdminLayout>
        </>
      )}
    </Refine>
  );
}

export default App;
