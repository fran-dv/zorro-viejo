import styles from "./Checkout.module.css";
import { useMediaQuery } from "usehooks-ts";
import { StickyFooterBar } from "@/components";
import { ActionButton } from "@/components";
import { formatPrice } from "@/utils";

interface Props {
  className?: string;
  total: number;
  onButtonClick: () => void;
}

export const Checkout = ({ className = "", total, onButtonClick }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 850px)");

  return (
    <div className={`${styles.container} ${className}`}>
      {isDesktop ? (
        <div className={styles.checkOutContainer}>
          <h4 className={styles.total}>Total: {formatPrice(total)}</h4>
          <ActionButton
            onClick={onButtonClick}
            content="Proceder con la compra"
            role="button"
            aria-label="Proceder con la compra"
          />
        </div>
      ) : (
        <StickyFooterBar
          containerClassName={styles.stickyFooterBarContainer}
          wrapperClassName={styles.stickyFooterBarWrapper}
        >
          <h4 className={styles.total}>Total: {formatPrice(total)}</h4>

          <ActionButton
            onClick={onButtonClick}
            content="Proceder con la compra"
            role="button"
            aria-label="Proceder con la compra"
          />
        </StickyFooterBar>
      )}
    </div>
  );
};
