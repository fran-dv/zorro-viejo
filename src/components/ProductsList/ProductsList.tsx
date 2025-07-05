import type { Product, ProductsByCategory } from "@/models";
import styles from "./ProductsList.module.css";
import { ProductCard, ProductsCarousel } from "@/components";
import { LoadingView } from "@/components";
import { Paths } from "@/routing";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/stores";

interface Props {
  productsByCategory: ProductsByCategory[];
  areProductsLoading: boolean;
}

export const ProductsList = ({
  productsByCategory,
  areProductsLoading,
}: Props) => {
  const navigate = useNavigate();
  const { addItemToCart } = useCartStore();

  if (!productsByCategory.length) {
    return <LoadingView message="Cargando productos..." />;
  }

  const handleProductClick = (slug: string) => {
    navigate(Paths.getProductDetailPath(slug));
  };

  const handleAddToCart = (product: Product) => {
    addItemToCart(product);
  };

  return (
    <div className={styles.container}>
      {productsByCategory.length > 1 ? (
        productsByCategory.map((it) => {
          if (it.products.length === 0) return null;

          return (
            <div className={styles.AllCategoriesContainer} key={it.category.id}>
              <div>
                <h2 className={styles.categorySectionTitle}>
                  {it.category.name}
                </h2>
                <ProductsCarousel
                  cards={it.products.map((p) => (
                    <ProductCard
                      product={p}
                      key={p.id}
                      isLoading={areProductsLoading}
                      onClick={() => handleProductClick(p.slug)}
                      onAddToCartClick={() => handleAddToCart(p)}
                    />
                  ))}
                />
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
                onClick={() => handleProductClick(prod.slug)}
                onAddToCartClick={() => handleAddToCart(prod)}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
};
