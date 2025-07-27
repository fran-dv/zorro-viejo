import { LoadingView } from "@/components";
import { lazy, Suspense } from "react";
import { RoutesWithNotFound } from "@/routing/RoutesWithNotFound";
import { Route } from "react-router-dom";

const PublicRoutes = lazy(() => import("@/routing/PublicRoutes"));
const PrivateRoutes = lazy(() => import("@/routing/PrivateRoutes"));

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingView message="Cargando vista…" />}>
      <RoutesWithNotFound>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/admin/*" element={<PrivateRoutes />} />
      </RoutesWithNotFound>
    </Suspense>
  );
};
