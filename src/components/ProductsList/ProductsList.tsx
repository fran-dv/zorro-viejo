import type { ProductsByCategory } from "@/models";
import styles from "./ProductsList.module.css";
import { ProductCard } from "@/components";
import { LoadingView } from "@/components";

interface Props {
  productsByCategory: ProductsByCategory[];
  areProductsLoading: boolean;
}

export const ProductsList = ({
  productsByCategory,
  areProductsLoading,
}: Props) => {
  if (!productsByCategory.length) {
    return <LoadingView message="Cargando productos..." />;
  }

  return (
    <div className={styles.container}>
      {productsByCategory.length > 1 ? (
        productsByCategory.map((it) => {
          if (it.products.length === 0) return null;

          return (
            <div className={styles.AllCategoriesContainer} key={it.category.id}>
              <div>
                <h2>{it.category.name}</h2>
                <p>(Carousel de {it.products.length} productos)</p>
                {/* <ProductsCarousel products={it.products} /> */}
              </div>
            </div>
          );
        })
      ) : (
        <>
          <div className={styles.productsContainer}>
            {productsByCategory[0].products.length === 0 && (
              <p className={styles.noProducts}>
                No tenemos productos disponibles en esta categoría. Puedes
                explorar otras!
              </p>
            )}
            {productsByCategory[0].products.map((prod) => (
              <ProductCard
                product={prod}
                key={prod.id}
                isLoading={areProductsLoading}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
