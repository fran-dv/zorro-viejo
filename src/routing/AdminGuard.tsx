import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Paths } from "@/routing";
import { useIsAuthenticated } from "@refinedev/core";
import { LoadingView } from "@/components";

export const AdminGuard = () => {
  const {
    isLoading: authLoading,
    data: authData,
    isError,
  } = useIsAuthenticated();
  const location = useLocation();

  if (authLoading) {
    return <LoadingView message="Cargando sesión…" />;
  }

  if (isError || !authData?.authenticated) {
    return (
      <Navigate
        to={Paths.AdminLogin}
        replace
        state={{ from: location.pathname }}
      />
    );
  }

  return <Outlet />;
};
