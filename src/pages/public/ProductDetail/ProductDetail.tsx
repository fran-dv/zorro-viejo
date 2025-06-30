import { useParams } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import { useProductBySlug } from "@/hooks";
import { LoadingView } from "@/components";

export const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();

  const {
    data: product,
    error,
    isFetching,
  } = useProductBySlug({ slug: slug ?? "" });

  if (isFetching) {
    return <LoadingView message="Cargando producto..." />;
  }

  if (!product) {
    return (
      <div>
        <p>No pudimos encontrar el producto ):</p>
        <button>Volver a productos!</button>
      </div>
    );
  }

  if (error) {
    throw new Error(`Error fetching product: ${error.message}`);
  }

  return (
    <div className={styles.container}>
      <h2>{product?.name}</h2>
      <p>Here would be the information of the product!</p>
    </div>
  );
};
