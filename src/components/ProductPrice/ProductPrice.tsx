import styles from "./ProductPrice.module.css";

interface Props {
  price: number;
  offerPrice?: number;
}

export const ProductPrice = ({ price, offerPrice = undefined }: Props) => {
  return offerPrice ? (
    <>
      <div className={styles.oldPrice}>
        <div className={styles.cross}></div>
        <h3>${price}</h3>
      </div>
      <div className={styles.price}>
        <h3>${offerPrice}</h3>
      </div>
      <span className={styles.offerTag}>¡Aprovechá!</span>
    </>
  ) : (
    <div className={styles.price}>
      <h3>${price}</h3>
    </div>
  );
};
