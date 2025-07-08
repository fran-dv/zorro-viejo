import styles from "./ProductPrice.module.css";

interface Props {
  price: number;
  offerPrice?: number;
  showOfferTag?: boolean;
}

export const ProductPrice = ({
  price,
  offerPrice = undefined,
  showOfferTag = true,
}: Props) => {
  return offerPrice ? (
    <>
      <div className={styles.oldPrice}>
        <div className={styles.cross}></div>
        <h3>${price}</h3>
      </div>
      <div className={styles.price}>
        <h3>${offerPrice}</h3>
      </div>
      {showOfferTag && <span className={styles.offerTag}>¡Aprovechá!</span>}
    </>
  ) : (
    <div className={styles.price}>
      <h3>${price}</h3>
    </div>
  );
};
