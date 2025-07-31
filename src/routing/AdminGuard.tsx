import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Paths } from "@/routing";
import { useIsAuthenticated } from "@refinedev/core";
import { LoadingView } from "@/components";
import { useEffect, useState } from "react";
import { ErrorFetching } from "@/components/Errors";

export const AdminGuard = () => {
  const {
    isLoading: authLoading,
    data: authData,
    isError,
    refetch,
  } = useIsAuthenticated();
  const location = useLocation();
  const [timeoutPassed, setTimeoutPassed] = useState<boolean>(false);

  useEffect(() => {
    if (!authLoading || authData) return;

    const timeout = setTimeout(() => {
      if (!authData && authLoading) {
        setTimeoutPassed(true);
      }
    }, 15000);

    return () => clearTimeout(timeout);
  }, [authData, authLoading, refetch, timeoutPassed]);

  if (timeoutPassed && !authData) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ErrorFetching
          message="Error al cargar la sesión. Revisa tu conexión y vuelve a intentarlo"
          onRetry={() => {
            refetch();
            setTimeoutPassed(false);
          }}
        />
      </div>
    );
  }

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
