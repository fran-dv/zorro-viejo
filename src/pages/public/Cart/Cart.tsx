import { useCartStore } from "@/stores";
import styles from "./Cart.module.css";
import { NavigateButton } from "@/components";
import { Paths } from "@/routing";
import { CartItemCard, Checkout } from "./components";

const title: React.ReactNode = (
  <div className={styles.titleContainer}>
    <h1>Tu carrito</h1>
  </div>
);

export const Cart = () => {
  const {
    items,
    incrementItemAmount,
    decrementItemAmount,
    removeItem,
    getTotalPrice,
  } = useCartStore();

  const handleIncrementItem = (itemId: number) => {
    incrementItemAmount(itemId);
  };

  const handleDecrementItem = (itemId: number) => {
    decrementItemAmount(itemId);
  };

  const handleDeleteItem = (itemId: number) => {
    removeItem(itemId);
  };

  if (items.length === 0) {
    return (
      <div className={styles.emptyContainer}>
        {title}
        <p>No hay productos en el carrito :(</p>
        <NavigateButton
          to={Paths.Products}
          arrow
          arrowSide="left"
          className={styles.navigateButton}
        >
          Explorar bebidas
        </NavigateButton>
      </div>
    );
  }

  return (
    <>
      <div className={styles.returnButtonContainer}>
        <NavigateButton
          to={Paths.Products}
          arrow
          arrowSide="left"
          className={styles.navigateButton}
        >
          Volver a bebidas
        </NavigateButton>
      </div>
      {title}

      <div className={styles.container}>
        <ul className={styles.itemsList}>
          {items.map((item) => (
            <li key={item.id}>
              <CartItemCard
                item={item}
                onIncrementItem={() => handleIncrementItem(item.id)}
                onDecrementItem={() => handleDecrementItem(item.id)}
                onDeleteItem={() => handleDeleteItem(item.id)}
              />
            </li>
          ))}
        </ul>

        <Checkout
          total={getTotalPrice()}
          className={styles.checkoutContainer}
        />
      </div>
    </>
  );
};
