import type { ProductsByCategory } from "@/models";
import styles from "./ProductsList.module.css";
import { ProductCard } from "@/components";
import { LoadingView } from "@/components";

interface Props {
  productsByCategory: ProductsByCategory[];
}

export const ProductsList = ({ productsByCategory }: Props) => {
  if (!productsByCategory.length) {
    return <LoadingView message="Cargando productos..." />;
  }
  return (
    <div className={styles.container}>
      {productsByCategory.length > 1 ? (
        productsByCategory.map((it) => {
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
          <h2>{productsByCategory[0].category.name}</h2>
          <div className={styles.productsContainer}>
            {productsByCategory[0].products.map((prod) => (
              <ProductCard product={prod} key={prod.id} />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
