import { AgGridReact } from "ag-grid-react";
import styles from "./OrderList.module.css";
import {
  themeQuartz,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
  type SelectionChangedEvent,
} from "ag-grid-community";
import { formatOrders, generalThemeParams, type FormattedOrder } from "@/utils";
import { useDelete, useDeleteMany, useList } from "@refinedev/core";
import { useCallback, useMemo, useRef, useState } from "react";
import { GenericAlertDialog, LoadingView } from "@/components";
import { OrderSchema, type Order } from "@/models";
import { ErrorFetching } from "@/components/Errors";
import { useMediaQuery } from "usehooks-ts";
import {
  WarnMessage,
  DeleteCellRenderer,
} from "@/pages/private/Admin/components";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/routing";
import { Trash2 } from "lucide-react";
import { AG_GRID_LOCALE_ES } from "@ag-grid-community/locale";

const theme = themeQuartz.withParams({ ...generalThemeParams });
const initialPageSize = 20;

export const OrdersList = () => {
  const navigate = useNavigate();
  const isSmallDevice = useMediaQuery("(max-width: 700px)");
  const { data, error, isLoading, refetch } = useList({
    pagination: {
      mode: "off",
    },
    resource: "orders",
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

  const {
    mutate,
    error: deleteError,
    isPending: deleteIsPending,
  } = useDelete<{ id: string }>();

  const currentDeletingIds = useRef<string[]>([]);
  const {
    mutate: mutateMany,
    isPending: deleteManyIsPending,
    error: deleteManyError,
  } = useDeleteMany<{ id: string }>();

  const gridApi = useRef<GridApi>(null);
  const onGridReady = (params: GridReadyEvent) => {
    gridApi.current = params.api;
  };

  const handleOrderDelete = useCallback(
    ({ id, ids }: { id?: string; ids?: string[] }) => {
      if (!id && !ids) return;
      if (id) {
        currentDeletingIds.current = [id];
        mutate({
          resource: "orders",
          id: id,
        });
      }
      if (ids) {
        currentDeletingIds.current = ids;
        mutateMany({
          resource: "orders",
          ids: ids,
        });
      }
    },
    [mutate, mutateMany],
  );

  const columnDefs: ColDef[] = useMemo(
    () =>
      [
        { field: "id", headerName: "ID", flex: 1, hide: isSmallDevice },
        { field: "customerName", headerName: "Cliente", flex: 1 },
        {
          field: "createdAt",
          headerName: "Fecha",
          flex: 1,
          valueFormatter: (params) =>
            (params.data as FormattedOrder).formattedCreatedAt,
        },
        {
          field: "totalPrice",
          headerName: "Total",
          flex: 1,
          valueFormatter: (params) =>
            (params.data as FormattedOrder).formattedTotalPrice,
        },
        {
          field: "items",
          headerName: "Cantidad de items",
          flex: 1,
          hide: isSmallDevice,
          valueGetter: (params) => (params.data as FormattedOrder).items.length,
        },
        {
          headerName: "Acciones",
          field: "actions",
          flex: 1,
          sortable: false,
          filter: false,
          cellRenderer: DeleteCellRenderer,
          cellRendererParams: {
            onDelete: handleOrderDelete,
            isLoading: deleteIsPending || deleteManyIsPending,
            isLoadingIds: currentDeletingIds.current,
            error: !!deleteError || !!deleteManyError,
            dialogTitle: "Estás por eliminar una orden",
            dialogDescription:
              "Si eliminas esta orden, no podrás revertir la acción. ¿Qué quieres hacer?",
            cancelButtonContent: "Eliminar orden",
            continueButtonContent: "Mantener orden",
          },
        },
      ] as ColDef[],
    [
      isSmallDevice,
      deleteError,
      deleteIsPending,
      deleteManyError,
      deleteManyIsPending,
      handleOrderDelete,
    ],
  );
  const orders: Order[] = useMemo(
    () => data?.data.map((order) => OrderSchema.parse(order)) ?? [],
    [data],
  );

  const rowData = useMemo(() => formatOrders(orders), [orders]);

  const [selectedIds, setSelectedIds] = useState<string[]>([]);

  if (isLoading || !data) {
    return <LoadingView message="Cargando órdenes..." />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <ErrorFetching
          message="Error al cargar órdenes. Revisa tu conexión y vuelve a intentarlo"
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const handleRowClick = (id: string) => {
    navigate(Paths.getAdminOrderDetail(id));
  };

  const handleSelection = (e: SelectionChangedEvent) => {
    setSelectedIds(e.api.getSelectedRows().map((row) => row.id));
  };

  const handleBulkAction = (action: string) => {
    const selectedIds =
      gridApi.current?.getSelectedRows().map((row) => row.id) ?? [];
    if (action === "delete") {
      handleOrderDelete({ ids: selectedIds });
    }
  };

  return (
    <div className={styles.container}>
      {isSmallDevice && (
        <WarnMessage message="Esta sección funciona mejor en pantallas grandes. Te sugerimos abrirla desde una computadora." />
      )}
      <h2>Todas las órdenes</h2>

      <div className={styles.bulkActionsMenu}>
        <div
          className={`${styles.actionsWrapper} ${selectedIds.length === 0 && styles.hidden}`}
        >
          <GenericAlertDialog
            hasTriggerButton={true}
            titleContent="Estás por eliminar órdenes"
            descriptionContent="Si eliminas las órdenes, no podrás revertir la acción. ¿Qué quieres hacer?"
            onContinue={() => {}}
            onCancel={() => handleBulkAction("delete")}
            cancelButtonContent="Eliminar órdenes"
            continueButtonContent="Mantener órdenes"
            triggerButtonContent={
              <>
                <p>
                  Eliminar {selectedIds.length} orden
                  {selectedIds.length > 1 && "es"}
                </p>
                <Trash2 className={styles.icon} />
              </>
            }
            triggerButtonClassName={styles.bulkDeleteButton}
          />
        </div>
      </div>

      {deleteError && (
        <WarnMessage message="Error al eliminar la/s orden/es. Revisa tu conexión y vuelve a intentarlo." />
      )}

      <div className={styles.gridWrapper}>
        <AgGridReact
          onGridReady={onGridReady}
          theme={theme}
          columnDefs={columnDefs}
          rowData={rowData}
          rowModelType="clientSide"
          cacheBlockSize={initialPageSize}
          pagination={true}
          paginationPageSize={initialPageSize}
          paginationPageSizeSelector={[initialPageSize, 50, 100, 500]}
          onRowClicked={(e) => {
            const clickedCell = e.api.getFocusedCell();
            const isActionsCell =
              clickedCell?.column.getColDef().field === "actions";

            const isCheckbox = clickedCell?.column.isCellCheckboxSelection(
              e.node,
            );

            if (!isActionsCell && !isCheckbox) {
              handleRowClick(e.data.id);
            }
          }}
          rowSelection={{
            mode: "multiRow",
            checkboxes: true,
            headerCheckbox: true,
            enableClickSelection: true,
            enableSelectionWithoutKeys: true,
          }}
          onSelectionChanged={(e: SelectionChangedEvent) => {
            handleSelection(e);
          }}
          localeText={AG_GRID_LOCALE_ES}
        />
      </div>
    </div>
  );
};
