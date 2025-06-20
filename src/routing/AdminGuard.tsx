import { Navigate, Outlet } from "react-router-dom";
import { Paths } from "@/routing";

export const AdminGuard = () => {
  const isAdmin = true;

  return isAdmin ? <Outlet /> : <Navigate to={Paths.AdminLogin} replace />;
};
