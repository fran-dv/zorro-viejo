import { LoadingSpinner, LoadingView } from "@/components";
import { ErrorFetching } from "@/components/Errors";
import {
  formatPrice,
  formatProducts,
  formattedProductFieldToRawProductField,
  formattedProductToProduct,
  FormattedStock,
  generalThemeParams,
  type FormattedProduct,
} from "@/utils";
import { useDelete, useDeleteMany, useList, useUpdate } from "@refinedev/core";
import {
  themeQuartz,
  type CellValueChangedEvent,
  type ColDef,
  type GridApi,
  type GridReadyEvent,
  type SelectionChangedEvent,
} from "ag-grid-community";
import { AgGridReact } from "ag-grid-react";
import styles from "./ProductList.module.css";
import {
  ProductSchema,
  productToRawProductResponse,
  type Product,
} from "@/models";
import { useCallback, useMemo, useRef, useState } from "react";
import {
  ProductActionsCellRenderer,
  WarnMessage,
} from "@/pages/private/Admin/components";
import { useGlobalContext } from "@/context";
import { AG_GRID_LOCALE_ES } from "@ag-grid-community/locale";
import { useMediaQuery } from "usehooks-ts";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/routing";
import { TriangleAlert } from "lucide-react";
import { ProductsToolbar } from "./components/ProductsToolbar";
import type { BulkImportError } from "@/pages/private/Admin/hooks";

const theme = themeQuartz.withParams({ ...generalThemeParams });
const initialPageSize = 20;

type HandleProductDeleteFn = (ids: number[]) => void;

export const ProductsList = () => {
  const navigate = useNavigate();
  const isSmallDevice = useMediaQuery("(max-width: 850px)");
  const { categories } = useGlobalContext();
  const { data, error, isLoading, refetch } = useList({
    resource: "products",
    pagination: {
      mode: "off",
    },
    sorters: [{ field: "id", order: "asc" }],
  });

  const {
    mutate,
    isPending: deleteIsPending,
    error: deleteError,
  } = useDelete({});

  const {
    mutate: mutateMany,
    isPending: deleteManyIsPending,
    error: deleteManyError,
  } = useDeleteMany();

  const {
    mutate: mutateUpdate,
    error: updateError,
    isPending: updateIsPending,
  } = useUpdate();

  const currentDeletingIds = useRef<number[]>([]);

  const gridApi = useRef<GridApi>(null);
  const onGridReady = (params: GridReadyEvent) => {
    gridApi.current = params.api;
  };

  const handleProductDelete: HandleProductDeleteFn = useCallback(
    (ids) => {
      if (!ids) return;

      if (ids?.length === 1) {
        currentDeletingIds.current = ids;
        mutate({
          resource: "products",
          id: ids[0],
        });
      }

      if (ids?.length > 1) {
        currentDeletingIds.current = ids;
        mutateMany({
          resource: "products",
          ids: ids,
        });
      }
    },
    [mutate, mutateMany],
  );

  const handleProductEdit = useCallback(
    ({ id }: { id: number }) => {
      navigate(Paths.getAdminEditProduct(id));
    },
    [navigate],
  );

  const products: Product[] | undefined = data?.data.map((prod) =>
    ProductSchema.parse(prod),
  );

  const rowData: FormattedProduct[] = useMemo(
    () => formatProducts(products ?? [], categories),
    [products, categories],
  );

  const columnDefs: ColDef[] = useMemo(
    () =>
      [
        { field: "id", headerName: "ID", flex: 0.4 },
        {
          field: "categoryName",
          headerName: "Categoría",
          flex: 1,
          filter: "agTextColumnFilter",
          floatingFilter: true,
          editable: true,
          cellEditor: "agSelectCellEditor",
          cellEditorParams: {
            values: categories.map((cat) => cat.name),
          },
          valueParser: (params) =>
            categories.find((cat) => cat.name === params.newValue)?.id,
        },
        {
          field: "name",
          headerName: "Nombre",
          flex: 1,
          filter: "agTextColumnFilter",
          floatingFilter: true,
          editable: true,
        },
        {
          field: "price",
          headerName: "Precio",
          flex: 1,
          valueFormatter: (params) =>
            formatPrice((params.data as Product).price),
          filter: "agNumberColumnFilter",
          floatingFilter: true,
          editable: true,
        },
        {
          field: "offerPrice",
          headerName: "Precio de oferta",
          flex: 1,
          valueFormatter: (params) => {
            const offerPrice = (params.data as Product).offerPrice;
            return offerPrice ? formatPrice(offerPrice) : "-";
          },
          filter: "agNumberColumnFilter",
          floatingFilter: true,
          editable: true,
          valueParser: (params) => Number(params.newValue),
        },
        {
          field: "formattedStock",
          headerName: "Stock",
          flex: 1,
          filter: "agTextColumnFilter",
          floatingFilter: true,
          editable: true,
          cellEditor: "agSelectCellEditor",
          cellEditorParams: {
            values: [FormattedStock.inStock, FormattedStock.outOfStock],
          },
        },
        {
          field: "unitsInPackage",
          headerName: "Unidades por paquete",
          flex: 1,
          filter: "agNumberColumnFilter",
          floatingFilter: true,
          editable: true,
          valueParser: (params) => Number(params.newValue),
        },
        {
          field: "unitVolumeMl",
          headerName: "Volumen por unidad (ml)",
          flex: 1,
          valueFormatter: (params) =>
            `${(params.data as Product).unitVolumeMl} ml`,
          filter: "agNumberColumnFilter",
          floatingFilter: true,
          editable: true,
          valueParser: (params) => Number(params.newValue),
        },
        {
          field: "actions",
          headerName: "Acciones",
          flex: 1,
          sortable: false,
          filter: false,
          cellRenderer: ProductActionsCellRenderer,
          cellRendererParams: {
            onEdit: handleProductEdit,
            onDelete: handleProductDelete,
            isDeleteLoading: deleteIsPending || deleteManyIsPending,
            isDeleteLoadingIds: currentDeletingIds.current,
            isDeleteError: !!deleteError || !!deleteManyError,
            deleteDialogTitle: "Estás por eliminar un producto",
            deleteDialogDescription:
              "Si eliminas este producto, no podrás revertir la acción. ¿Qué quieres hacer?",
            deleteCancelButtonContent: "Eliminar producto",
            deleteContinueButtonContent: "Mantener producto",
          },
        },
      ] as ColDef[],
    [
      categories,
      deleteError,
      deleteIsPending,
      deleteManyError,
      deleteManyIsPending,
      handleProductDelete,
      handleProductEdit,
    ],
  );

  const [selectedIds, setSelectedIds] = useState<number[]>([]);
  const [isImportLoading, setIsImportLoading] = useState(false);
  const [importErrors, setImportErrors] = useState<BulkImportError[]>([]);

  if (isSmallDevice) {
    return (
      <div className={styles.errorContainer}>
        <WarnMessage
          closable={false}
          message="Esta página sólo funciona en pantallas grandes. Por favor, accede desde escritorio."
        />
      </div>
    );
  }

  if (isLoading) {
    return <LoadingView message="Cargando productos..." />;
  }

  if (error) {
    return (
      <div className={styles.errorContainer}>
        <ErrorFetching
          message="Error al cargar productos. Revisa tu conexión y vuelve a intentarlo"
          onRetry={() => refetch()}
        />
      </div>
    );
  }

  const onCellValueChanged = (e: CellValueChangedEvent) => {
    const localProduct = formattedProductToProduct(
      e.data as FormattedProduct,
      categories,
    );
    const rawProduct = productToRawProductResponse(localProduct);
    const field = formattedProductFieldToRawProductField(
      e.colDef.field as keyof FormattedProduct,
    );

    mutateUpdate({
      resource: "products",
      id: rawProduct.id,
      values: {
        [field]: rawProduct[field],
      },
    });
  };

  const handleSelection = (e: SelectionChangedEvent) => {
    setSelectedIds(e.api.getSelectedRows().map((row) => row.id));
  };

  return (
    <div className={styles.container}>
      <h2>Todos los productos</h2>

      <ProductsToolbar
        selectedIds={selectedIds}
        onDelete={handleProductDelete}
        setIsLoading={setIsImportLoading}
        setErrors={setImportErrors}
      />

      <div className={styles.updateStatusContainer}>
        {updateError && (
          <>
            <TriangleAlert className={styles.warnIcon} />
            <p>
              Error actualizando el producto. Revisa tu conexión y vuelve a
              intentarlo
            </p>
          </>
        )}
        {updateIsPending && (
          <>
            <LoadingSpinner />
            <p>Actualizando el producto...</p>
          </>
        )}
        {isImportLoading && (
          <>
            <LoadingSpinner />
            <p>Importando productos...</p>
          </>
        )}
        {importErrors.length > 0 && (
          <>
            <TriangleAlert className={styles.warnIcon} />
            <p>Error importando productos. Detalles debajo de la tabla.</p>
          </>
        )}
      </div>

      <div className={styles.gridWrapper}>
        <AgGridReact
          onGridReady={onGridReady}
          getRowId={(params) => params.data.id}
          theme={theme}
          columnDefs={columnDefs}
          rowData={rowData}
          rowModelType="clientSide"
          pagination={true}
          paginationPageSize={initialPageSize}
          paginationPageSizeSelector={[initialPageSize, 50, 100, 500]}
          rowSelection={{
            mode: "multiRow",
            checkboxes: true,
            headerCheckbox: true,
            enableSelectionWithoutKeys: true,
          }}
          onSelectionChanged={(e: SelectionChangedEvent) => handleSelection(e)}
          localeText={AG_GRID_LOCALE_ES}
          onCellValueChanged={onCellValueChanged}
        />
      </div>

      {importErrors.length > 0 && (
        <div className={styles.importErrorContainer}>
          <h2>Errores al importar productos</h2>
          <p>
            Debajo se detallan los errores fila por fila, para que puedas
            revisar el archivo .CSV, y corregir lo indicado. Cuando lo exportes
            nuevamente, cerciórate de que no queden filas vacías.
          </p>
          <ul>
            {importErrors.map(({ rows, error }, idx) => (
              <li key={idx}>
                <h4>
                  Error en fila{rows.length > 1 ? "s" : ""} {rows.join(", ")}
                </h4>
                <p>{error}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};
