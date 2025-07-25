import { AdminSidebar } from "@/components/Admin";

interface Props {
  children: React.ReactNode;
}

export const AdminLayout = ({ children }: Props) => {
  return (
    <div>
      <AdminSidebar />
      {children}
    </div>
  );
};
