import styles from "./LastOrders.module.css";
import type { Order } from "@/models";
import { AgGridReact } from "ag-grid-react";
import { themeQuartz } from "ag-grid-community";
import { formatPrice } from "@/utils";
import { useMediaQuery } from "usehooks-ts";

interface Props {
  onOrderRowClick: (id: string) => void;
  orders: Order[];
}

const theme = themeQuartz.withParams({
  accentColor: "#E25822",
  browserColorScheme: "light",
  columnBorder: false,
  foregroundColor: "#212121",
  headerFontSize: 14,
  spacing: 8,
  wrapperBorderRadius: 20,
  fontFamily: {
    googleFont: "Poppins",
  },
  fontSize: 14,
});

export const LastOrders = ({ onOrderRowClick, orders }: Props) => {
  const isSmallDevice = useMediaQuery("(max-width: 500px)");
  const isMediumDevice = useMediaQuery("(max-width: 850px)");
  const formattedOrders = orders.map((order) => {
    return {
      ...order,
      totalPrice: formatPrice(order.totalPrice),
      createdAt: new Date(order.createdAt).toLocaleString(),
    };
  });

  return (
    <section className={styles.recentOrdersSection}>
      <h2>Últimas órdenes</h2>
      <div className={styles.recentOrdersWrapper}>
        <AgGridReact
          defaultColDef={{ sortable: false }}
          theme={theme}
          onRowClicked={(params: unknown) =>
            onOrderRowClick((params as { data: Order }).data.id)
          }
          rowData={formattedOrders}
          columnDefs={[
            { field: "id", headerName: "ID", flex: 1, hide: isSmallDevice },
            { field: "customerName", headerName: "Cliente", flex: 1 },
            {
              field: "createdAt",
              headerName: "Fecha",
              flex: 1,
              hide: isSmallDevice,
            },
            { field: "totalPrice", headerName: "Total", flex: 1 },
            {
              field: "items",
              headerName: "Items",
              valueGetter: (p) => p.data?.items.length,
              flex: 1,
              hide: isMediumDevice || isSmallDevice,
            },
          ]}
        />
      </div>
    </section>
  );
};
