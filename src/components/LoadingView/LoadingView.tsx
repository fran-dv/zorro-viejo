import { LoadingSpinner } from "../LoadingSpinner/LoadingSpinner";
import styles from "./LoadingView.module.css";

interface Props {
  message: string;
}

export const LoadingView = ({ message }: Props) => {
  return (
    <div className={styles.container}>
      <LoadingSpinner />
      <p>{message}</p>
    </div>
  );
};
