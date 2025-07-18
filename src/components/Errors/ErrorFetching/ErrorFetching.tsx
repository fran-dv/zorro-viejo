import styles from "./ErrorFetching.module.css";
import { RotateCcw } from "lucide-react";

interface Props {
  message: string;
  onRetry: () => void;
  isFetching?: boolean;
}

export const ErrorFetching = ({
  message,
  onRetry,
  isFetching = false,
}: Props) => {
  return (
    <div className={styles.container}>
      <p className={styles.message}>{message}</p>
      <button className={styles.retryButton} onClick={onRetry}>
        <RotateCcw
          className={`${styles.icon} ${isFetching && styles.rotate}`}
        />
      </button>
      {isFetching && <p className={styles.retryP}>Reintentando...</p>}
    </div>
  );
};
