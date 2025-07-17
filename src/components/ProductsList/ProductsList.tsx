import type { Product, ProductsByCategory } from "@/models";
import styles from "./ProductsList.module.css";
import { ProductCard, ProductsCarousel, Snackbar } from "@/components";
import { LoadingView } from "@/components";
import { Paths } from "@/routing";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/stores";
import { useSnackbar } from "@/hooks";

interface Props {
  productsByCategory: ProductsByCategory[];
  areProductsLoading: boolean;
}

export const ProductsList = ({
  productsByCategory,
  areProductsLoading,
}: Props) => {
  const navigate = useNavigate();
  const { items, addItemToCart, removeItem } = useCartStore();
  const {
    isOpened,
    content,
    onUndo,
    showUndo,
    openSnackbar,
    closeSnackbar,
    setOnUndo,
  } = useSnackbar();

  if (!productsByCategory.length) {
    return <LoadingView message="Cargando productos..." />;
  }

  const handleProductClick = (slug: string) => {
    navigate(Paths.getProductDetailPath(slug));
  };

  const handleAddToCart = (product: Product) => {
    addItemToCart(product);
    setOnUndo(() => removeItem(product.id));

    const isProductInCart =
      items.findIndex((item) => item.product.id === product.id) === -1
        ? false
        : true;

    if (!isProductInCart) {
      openSnackbar("Producto añadido!", true);
    } else {
      openSnackbar("Ya está en el carrito!", false);
    }
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
      {isOpened && (
        <Snackbar
          content={content}
          seconds={4}
          onClose={closeSnackbar}
          showUndoBtn={showUndo}
          onUndo={onUndo}
        />
      )}
    </div>
  );
};
