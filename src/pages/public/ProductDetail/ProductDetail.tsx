import { useParams } from "react-router-dom";
import styles from "./ProductDetail.module.css";
import {
  useProductBySlug,
  useRelatedProducts,
  useHideOnFooter,
  useSnackbar,
} from "@/hooks";
import {
  ActionButton,
  ImagesCarousel,
  LoadingView,
  ProductCard,
  ProductImage,
  ProductPrice,
  SearchInterface,
  StickyFooterBar,
  ProductsCarousel,
  Snackbar,
} from "@/components";
import { Paths } from "@/routing";
import { NavigateButton } from "@/components";
import { useMediaQuery } from "usehooks-ts";
import { StockTag } from "./components";
import type { Product } from "@/models";
import { useNavigate } from "react-router-dom";
import { useCartStore } from "@/stores";

export const ProductDetail = () => {
  const { slug } = useParams<{ slug: string }>();
  const isDesktop = useMediaQuery("(min-width: 850px)");
  const { isFooterVisible } = useHideOnFooter();
  const navigate = useNavigate();
  const { addItemToCart, removeItem } = useCartStore();
  const {
    isOpened,
    content,
    showUndo,
    onUndo,
    openSnackbar,
    setOnUndo,
    closeSnackbar,
  } = useSnackbar();

  const { data, error, isFetching } = useProductBySlug({ slug: slug ?? "" });

  const { data: relatedProducts, isFetching: relatedProductsIsFetching } =
    useRelatedProducts({
      product: data?.product as Product | null,
      limit: 6,
      enabled: !!data?.product,
    });

  if (isFetching) {
    return <LoadingView message="Cargando producto..." />;
  }

  if (!data || (!data.product && !data.similarProducts)) {
    return (
      <div className={styles.notFoundContainer}>
        <p>No pudimos encontrar el producto ):</p>
        <NavigateButton
          to={Paths.Products}
          className={styles.navigateButton}
          arrow
          arrowSide="left"
        >
          Volver a todas las bebidas
        </NavigateButton>
      </div>
    );
  }

  if (error) {
    throw new Error(`Error fetching product: ${error.message}`);
  }

  const { product, similarProducts } = data;

  if (!product && similarProducts) {
    return (
      <div className={styles.similarProductsContainer}>
        <p>No pudimos encontrar el producto. Quizás quisiste decir: </p>
        <ul className={styles.similarProductsUl}>
          {similarProducts.map((product) => (
            <li key={product.id}>
              <NavigateButton
                to={Paths.getProductDetailPath(product.slug)}
                className={styles.navigateButton}
                arrow
                arrowSide="right"
              >
                {product.name}
              </NavigateButton>
            </li>
          ))}
        </ul>
      </div>
    );
  }

  if (!product) return;

  const handleAddToCart = () => {
    addItemToCart(product);
    setOnUndo(() => removeItem(product.id));
    openSnackbar("Producto añadido!", true);
    console.log("snackbar opened. On undo: ", onUndo);
  };

  return (
    <div className={styles.container}>
      {isDesktop && <SearchInterface />}
      <div className={styles.productContainer}>
        <div className={styles.imageWrapper}>
          <div className={styles.imageContainer}>
            {product.imageUrls.length > 1 ? (
              <ImagesCarousel
                images={product.imageUrls.map((imageUrl) => (
                  <ProductImage
                    className={styles.image}
                    key={imageUrl}
                    imageUrl={imageUrl}
                  />
                ))}
              />
            ) : (
              <ProductImage
                className={styles.image}
                key={product.imageUrls[0]}
                imageUrl={product.imageUrls[0]}
              />
            )}
          </div>
        </div>
        <div className={styles.infoContainer}>
          <h2 className={styles.productName}>
            {product.name} <StockTag inStock={product.inStock} />
          </h2>
          <div className={styles.priceSection}>
            <ProductPrice
              price={product.price}
              offerPrice={product.offerPrice}
            />
          </div>
          <div className={styles.packageSection}>
            <p>
              por {product.unitsInPackage} unidad
              {product.unitsInPackage > 1 ? "es" : ""} de {product.unitVolumeMl}{" "}
              ml
            </p>
          </div>

          {isDesktop && (
            <ActionButton
              onClick={handleAddToCart}
              content="Añadir al carrito"
              className={styles.addToCartButton}
            />
          )}

          <div className={styles.descriptionContainer}>
            <h3 className={styles.descriptionTitle}>Descripción:</h3>
            <p>{product.description}</p>
          </div>
        </div>
      </div>

      {!isDesktop && (
        <StickyFooterBar isHidden={isFooterVisible}>
          <SearchInterface floatingButtonClassName={styles.searchButton} />
          <ActionButton
            className={styles.addToCartButton}
            onClick={handleAddToCart}
            content="Añadir al carrito"
          />
        </StickyFooterBar>
      )}

      {relatedProductsIsFetching && (
        <LoadingView message="Cargando productos relacionados..." />
      )}
      {relatedProducts && (
        <div className={styles.relatedProductsContainer}>
          <h2>Productos relacionados:</h2>
          <ProductsCarousel
            cards={relatedProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                isLoading={relatedProductsIsFetching}
                onClick={() => navigate(Paths.getProductDetailPath(p.slug))}
                onAddToCartClick={handleAddToCart}
              />
            ))}
          />
        </div>
      )}
      {isOpened && (
        <Snackbar
          content={content}
          seconds={4}
          showUndoBtn={showUndo}
          onUndo={onUndo}
          onClose={closeSnackbar}
        />
      )}
    </div>
  );
};
