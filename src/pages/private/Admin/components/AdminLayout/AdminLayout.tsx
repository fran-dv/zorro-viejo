import { AdminSidebar } from "@/pages/private/Admin/components";
import { useIsAuthenticated } from "@refinedev/core";
import { Navigate } from "react-router-dom";
import { Paths } from "@/routing";

interface Props {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: Props) => {
  const { data } = useIsAuthenticated();

  if (!data?.authenticated) {
    return <Navigate to={Paths.AdminLogin} replace />;
  }

  return (
    <div>
      <AdminSidebar />
      {children}
    </div>
  );
};
