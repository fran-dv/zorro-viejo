import { AdminSidebar } from "@/pages/private/Admin/components";
import styles from "./AdminLayout.module.css";
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
    <div className={styles.container}>
      <AdminSidebar />
      {children}
    </div>
  );
};
