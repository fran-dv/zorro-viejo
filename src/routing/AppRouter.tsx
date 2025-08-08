import { LoadingView } from "@/components";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const PublicRoutes = lazy(() => import("@/routing/PublicRoutes"));
const PrivateRoutes = lazy(() => import("@/routing/PrivateRoutes"));

export const AppRouter = () => {
  return (
    <Suspense fallback={<LoadingView message="Cargando vista…" />}>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/admin/*" element={<PrivateRoutes />} />
      </Routes>
    </Suspense>
  );
};
