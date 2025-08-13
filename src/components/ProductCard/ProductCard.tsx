import { Package } from "lucide-react";
import styles from "./ProductCard.module.css";
import type { Product } from "@/models";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { ActionButton, ProductPrice } from "@/components";

interface Props {
  product: Product;
  isLoading?: boolean;
  onClick?: () => void;
  onAddToCartClick?: () => void;
}

export const ProductCard = ({
  product,
  isLoading,
  onClick,
  onAddToCartClick,
}: Props) => {
  const shortDescription =
    product.shortDescription ?? product.description.slice(0, 50) + "...";

  if (isLoading) {
    return (
      <div className={styles.container}>
        <div
          className={styles.image}
          style={{ backgroundColor: "transparent" }}
        >
          <Skeleton
            borderRadius={"1rem"}
            containerClassName={styles.skeleton}
            height={"100%"}
          />
        </div>
        <div>
          <h2>
            <Skeleton
              borderRadius={"0.5rem"}
              height={25}
              containerClassName={styles.skeleton}
            />
          </h2>
        </div>
        <div className={styles.description}>
          <p>
            <Skeleton
              borderRadius={"0.25rem"}
              count={3}
              containerClassName={styles.skeleton}
            />
          </p>
        </div>

        <div className={styles.bottomSection}>
          <Skeleton
            height={35}
            style={{ marginTop: "1.5rem" }}
            containerClassName={styles.skeleton}
            borderRadius={"1rem"}
          />
        </div>
      </div>
    );
  }

  const handleAddToCartClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    onAddToCartClick?.();
  };

  return (
    <div className={styles.container} onClick={onClick}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${product.imageUrls[0]})` }}
        role="img"
        aria-label={`Imagen de ${product.name}`}
      ></div>
      <div>
        <h2>{product.name}</h2>
      </div>
      <div className={styles.description}>
        <p>{shortDescription}</p>
      </div>

      <div className={styles.bottomSection}>
        <div className={styles.packageInfo}>
          <Package className={styles.packageIcon} />
          <p>
            {product.unitsInPackage} x {product.unitVolumeMl}ml
          </p>
        </div>
        <div className={styles.priceSection}>
          <ProductPrice
            price={product.price}
            offerPrice={product.offerPrice ?? undefined}
          />
        </div>
        <ActionButton onClick={handleAddToCartClick} />
      </div>
    </div>
  );
};
