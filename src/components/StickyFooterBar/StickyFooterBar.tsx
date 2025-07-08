import styles from "./StickyFooterBar.module.css";

interface Props {
  children: React.ReactNode;
  isHidden?: boolean;
  wrapperClassName?: string;
  containerClassName?: string;
}

export const StickyFooterBar = ({
  children,
  isHidden,
  wrapperClassName = "",
  containerClassName = "",
}: Props) => {
  return (
    <div
      className={`${styles.wrapper} ${isHidden ? styles.hidden : ""} ${wrapperClassName}`}
    >
      <div className={`${styles.container} ${containerClassName}`}>
        {children}
      </div>
    </div>
  );
};
