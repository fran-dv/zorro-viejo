import styles from "./CounterBadge.module.css";

interface Props {
  children: React.ReactNode;
  count: number;
}

export const CounterBadge = ({ children, count }: Props) => {
  return (
    <div
      className={styles.container}
      aria-label={`Counter badge showing ${children}`}
      role="status"
    >
      {children}
      <span className={styles.badge}>{count}</span>
    </div>
  );
};
