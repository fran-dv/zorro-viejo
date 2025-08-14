import { useOne, useUpdate } from "@refinedev/core";
import {
  ProductSchema,
  productToRawProductResponse,
  type Product,
} from "@/models";
import { LoadingView, ScrollToTop, Snackbar } from "@/components";
import { WarnMessage, ProductForm } from "@/pages/private/Admin/components";
import styles from "./EditProduct.module.css";
import { useSnackbar } from "@/hooks";
import { useParams } from "react-router-dom";
import { ErrorFetching } from "@/components/Errors";

export const EditProduct = () => {
  const { id } = useParams();
  const { data, isLoading, error, refetch } = useOne({
    resource: "products",
    id: Number(id),
  });
  const { mutate, isPending, error: updateError } = useUpdate();

  const snackbar = useSnackbar();

  const handleSubmit = (data: Product) => {
    const rawProduct = productToRawProductResponse(data);
    mutate(
      {
        resource: "products",
        values: rawProduct,
        id: rawProduct.id,
      },
      {
        onSuccess: () =>
          snackbar.openSnackbar(
            "Producto editado exitosamente",
            snackbar.showUndo,
          ),
      },
    );
  };

  if (isLoading) {
    return <LoadingView message="Cargando producto..." />;
  }

  if (error || !data) {
    return (
      <div className={styles.errorContainer}>
        <ErrorFetching
          message="Error al cargar el producto. Revisa tu conexión y vuelve a intentarlo"
          onRetry={refetch}
          isFetching={isLoading}
        />
      </div>
    );
  }

  const product = ProductSchema.parse(data.data);

  return (
    <div className={styles.container}>
      <h1>Editar producto</h1>
      {updateError && (
        <div className={styles.errorWrapper}>
          <ScrollToTop />
          <WarnMessage
            message="Hubo un error al editar el producto. Por favor, revisa tu conexión y vuelve a intentarlo."
            closable
          />
        </div>
      )}
      <ProductForm
        action="edit"
        initialValues={product}
        onSubmit={handleSubmit}
        isPending={isPending}
      />
      {snackbar.isOpened && (
        <Snackbar
          content={snackbar.content}
          seconds={5}
          onClose={snackbar.closeSnackbar}
        />
      )}
    </div>
  );
};
