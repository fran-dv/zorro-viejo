import { useList } from "@refinedev/core";
import styles from "./AdminDashboard.module.css";
import { OrderSchema, type Order } from "@/models";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/routing";
import { LastOrders } from "./components";
import { LoadingView } from "@/components";

export const AdminDashboard = () => {
  const { data, error, isLoading } = useList({
    resource: "orders",
    pagination: { current: 1, pageSize: 10 },
    sorters: [
      {
        field: "created_at",
        order: "desc",
      },
    ],
    meta: {
      select: `
      id,
      customer_name,
      created_at,
      order_items:order_items (
        amount,
        product:products (*)
      )
    `,
    },
  });
  const navigate = useNavigate();

  if (error) {
    return <div>Error al cargar órdenes</div>;
  }

  if (isLoading) {
    return <LoadingView message="Cargando información..." />;
  }

  const orders: Order[] = data.data.map((order) => OrderSchema.parse(order));

  const handleRowClick = (id: string) => {
    navigate(Paths.getAdminOrderDetail(id));
  };

  return (
    <div className={styles.container}>
      <h1>Panel principal</h1>

      <LastOrders orders={orders} onOrderRowClick={handleRowClick} />
    </div>
  );
};
