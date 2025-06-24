import { Package } from "lucide-react";
import styles from "./ProductCard.module.css";
import type { Product } from "@/models";

interface Props {
  product: Product;
}

export const ProductCard = ({ product }: Props) => {
  const shortDescription =
    product.shortDescription ?? product.description.slice(0, 50) + "...";

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
