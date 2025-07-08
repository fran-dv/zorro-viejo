import { Minus, Plus } from "lucide-react";
import styles from "./QuantitySelector.module.css";

interface Props {
  value: number;
  onIncrement: () => void;
  onDecrement: () => void;
  className?: string;
}

export const QuantitySelector = ({
  value,
  onIncrement,
  onDecrement,
  className,
}: Props) => {
  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <button
        className={`${styles.button} ${styles.left}`}
        onClick={onDecrement}
      >
        <Minus className={styles.icon} />
      </button>
      <div className={styles.value}>
        <p>{value}</p>
      </div>
      <button
        className={`${styles.button} ${styles.right}`}
        onClick={onIncrement}
      >
        <Plus className={styles.icon} />
      </button>
    </div>
  );
};
