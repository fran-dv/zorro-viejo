import { Package } from "lucide-react";
import styles from "./ProductCard.module.css";
import type { Product } from "@/models";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

interface Props {
  product: Product;
  isLoading?: boolean;
}

export const ProductCard = ({ product, isLoading }: Props) => {
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

  return (
    <div className={styles.container}>
      <div
        className={styles.image}
        style={{ backgroundImage: `url(${product.imageUrls[0]})` }}
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
          {product.offerPrice ? (
            <>
              <div className={styles.oldPrice}>
                <div className={styles.cross}></div>
                <h3>${product.price}</h3>
              </div>
              <div className={styles.price}>
                <h3>${product.offerPrice}</h3>
              </div>
              <span className={styles.offerTag}>¡Aprovechá!</span>
            </>
          ) : (
            <div className={styles.price}>
              <h3>${product.price}</h3>
            </div>
          )}
        </div>
        <button className={styles.addToCartBtn}>
          <p>Añadir al carrito</p>
        </button>
      </div>
    </div>
  );
};
