import { ProductForm } from "@/pages/private/Admin/components/ProductForm/ProductForm";
import styles from "./CreateProduct.module.css";
import { productToRawProductResponse, type Product } from "@/models";
import { useCreate } from "@refinedev/core";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/routing";
import { ScrollToTop } from "@/components";
import { WarnMessage } from "../components";

export const CreateProduct = () => {
  const navigate = useNavigate();
  const { mutate, isPending, error } = useCreate({
    resource: "products",
  });

  const handleSubmit = (data: Product) => {
    const rawProduct = productToRawProductResponse(data);
    mutate(
      {
        values: rawProduct,
      },
      { onSuccess: () => navigate(Paths.getAdminEditProduct(rawProduct.id)) },
    );
  };

  return (
    <div className={styles.container}>
      <h1>Crear producto</h1>
      {error && (
        <div className={styles.errorWrapper}>
          <ScrollToTop />
          <WarnMessage
            message="Hubo un error al crear el producto. Por favor, revisa tu conexión y vuelve a intentarlo."
            closable
          />
        </div>
      )}
      <ProductForm
        action="create"
        onSubmit={handleSubmit}
        isPending={isPending}
      />
    </div>
  );
};
