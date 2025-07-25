import { LoadingView, NavigateButton } from "@/components";
import { useOrderById } from "@/hooks";
import { useParams } from "react-router-dom";
import { Paths } from "@/routing";
import styles from "./OrderDetail.module.css";
import { formatPrice } from "@/utils";
import { OrderItemsAccordion } from "./components";

export const OrderDetail = () => {
  const { id } = useParams();
  const { data: order, isLoading } = useOrderById({ id: id! });

  if (isLoading) {
    return <LoadingView message="Cargando la orden..." />;
  }

  if (!order) {
    return (
      <div className={styles.container}>
        <h4>
          Hubo un error al cargar la orden. Presiona el botón para volver al
          panel principal.
        </h4>

        <NavigateButton to={Paths.AdminDashboard}>
          Volver al panel principal
        </NavigateButton>
      </div>
    );
  }

  const date = new Date(order.createdAt);
  const formattedDate = date.toLocaleString("es-AR", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
    timeZone: "America/Argentina/Buenos_Aires",
  });
  const formattedPrice = formatPrice(order.totalPrice);

  return (
    <div className={styles.container}>
      <h1>Orden #{id}</h1>
      <div className={styles.mainInfoCard}>
        <h3>Información general</h3>
        <p className={styles.customerName}>
          <span className={styles.label}>Cliente:</span>{" "}
          <i>{order.customerName}</i>
        </p>
        <p>
          <span className={styles.label}>Fecha:</span> <i>{formattedDate}</i>
        </p>
        <hr />
        <p>
          <span className={styles.label}>Precio total:</span>{" "}
          <i>{formattedPrice}</i>
        </p>
      </div>

      <h2 className={styles.productsTitle}>Productos</h2>
      <OrderItemsAccordion items={order.items} />
    </div>
  );
};
