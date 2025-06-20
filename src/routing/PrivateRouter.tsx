import { Route } from "react-router-dom";
import { AdminDashboard } from "@/pages";
import { Navigate } from "react-router-dom";
import { RoutesWithNotFound } from "@/routing";
import { Paths } from "@/routing";

export const PrivateRouter = () => {
  return (
    <RoutesWithNotFound>
      <Route path="/" element={<Navigate to={Paths.AdminDashboard} />} />
      <Route path={Paths.AdminDashboard} element={<AdminDashboard />} />
    </RoutesWithNotFound>
  );
};
