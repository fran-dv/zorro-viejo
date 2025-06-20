import type { ReactNode } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { NotFound } from "@/pages";
import { Paths } from "@/routing";

interface Props {
  children: ReactNode;
}

export const RoutesWithNotFound = ({ children }: Props) => {
  return (
    <Routes>
      {children}
      <Route path="*" element={<Navigate to={Paths.NotFound} replace />} />
      <Route path={Paths.NotFound} element={<NotFound />} />
    </Routes>
  );
};
