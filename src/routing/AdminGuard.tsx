import { Navigate, Outlet } from "react-router-dom";
import { Paths } from "@/routing";
import { useIsAuthenticated } from "@refinedev/core";
import { LoadingView } from "@/components";

export const AdminGuard = () => {
  const { isLoading: authLoading, data: authData } = useIsAuthenticated();

  if (authLoading) {
    return <LoadingView message="Cargando sesión…" />;
  }

  if (!authData?.authenticated) {
    return <Navigate to={Paths.AdminLogin} replace />;
  }

  return <Outlet />;
};
