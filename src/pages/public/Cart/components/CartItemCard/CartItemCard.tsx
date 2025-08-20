import styles from "./CartItemCard.module.css";
import { ProductImage, ProductPrice } from "@/components";
import type { CartItem } from "@/models";
import { QuantitySelector } from "@/pages/public/Cart/components";
import { Trash2 } from "lucide-react";

interface Props {
  item: CartItem;
  onIncrementItem: () => void;
  onDecrementItem: () => void;
  onDeleteItem: () => void;
}

export const CartItemCard = ({
  item,
  onIncrementItem,
  onDecrementItem,
  onDeleteItem,
}: Props) => {
  return (
    <div className={styles.container}>
      <div className={styles.imageWrapper}>
        <ProductImage
          className={styles.image}
          imageUrl={item.product.imageUrls[0]}
        />
      </div>
      <div className={styles.infoContainer}>
        <div className={styles.titleAndPackageWrapper}>
          <h3 className={styles.productName}>{item.product.name}</h3>
          <div className={styles.packageInfo}>
            <p>
              por {item.product.unitsInPackage}{" "}
              {item.product.unitsInPackage > 1 ? "unidades" : "unidad"} de{" "}
              {item.product.unitVolumeMl}ml
            </p>
          </div>
        </div>

        <QuantitySelector
          className={styles.quantitySelector}
          value={item.amount}
          onIncrement={onIncrementItem}
          onDecrement={onDecrementItem}
        />

        <div className={styles.priceContainer}>
          <ProductPrice
            price={item.product.price}
            offerPrice={item.product.offerPrice ?? undefined}
            showOfferTag={false}
          />
        </div>
      </div>
      <div className={styles.deleteButtonContainer}>
        <button
          className={styles.deleteButton}
          onClick={onDeleteItem}
          aria-label="Eliminar producto"
        >
          <Trash2 className={styles.deleteIcon} />
        </button>
      </div>
    </div>
  );
};
