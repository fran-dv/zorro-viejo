import styles from "./StickyFooterBar.module.css";

interface Props {
  children: React.ReactNode;
  isHidden?: boolean;
}

export const StickyFooterBar = ({ children, isHidden }: Props) => {
  return (
    <div className={`${styles.wrapper} ${isHidden ? styles.hidden : ""}`}>
      <div className={styles.container}>{children}</div>
    </div>
  );
};
