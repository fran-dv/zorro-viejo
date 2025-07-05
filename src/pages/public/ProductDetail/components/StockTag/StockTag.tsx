import styles from "./StockTag.module.css";

interface Props {
  inStock: boolean;
  className?: string;
}

export const StockTag = ({ inStock, className = "" }: Props) => {
  return (
    <span
      className={`${styles.container} ${inStock ? styles.inStock : styles.outOfStock} ${className}`}
    >
      {inStock ? "En stock" : "Sin stock"}
    </span>
  );
};
