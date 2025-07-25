import type { OrderItem } from "@/models";
import { Accordion } from "radix-ui";
import styles from "./OrderItemsAccordion.module.css";
import { ChevronDown } from "lucide-react";
import { formatPrice } from "@/utils";

interface Props {
  items: OrderItem[];
}

export const OrderItemsAccordion = ({ items }: Props) => {
  const values: string[] = items.map((item) => item.product.id.toString());

  return (
    <Accordion.Root className={styles.root} type="single" collapsible>
      {items.map((item, idx) => (
        <Accordion.Item
          className={styles.item}
          key={item.product.id}
          value={values[idx]}
        >
          <Accordion.Header>
            <Accordion.Trigger className={styles.trigger}>
              <img src={item.product.imageUrls[0]} alt="" />

              <p className={styles.text}>
                <span className={styles.amount}>{item.amount} x</span>
                <span className={styles.productName}>{item.product.name}</span>
              </p>
              <ChevronDown className={styles.triggerIcon} />
            </Accordion.Trigger>
          </Accordion.Header>
          <Accordion.Content className={styles.content}>
            <h4>Info. del producto</h4>
            <ul className={styles.productInfo}>
              <li>
                <p>
                  {item.product.unitsInPackage} unidad
                  {item.product.unitsInPackage > 1 ? "es" : ""} de{" "}
                  {item.product.unitVolumeMl} ml
                </p>
              </li>
              <li>
                <p>Precio unitario: {formatPrice(item.product.price)}</p>
              </li>
            </ul>
          </Accordion.Content>
        </Accordion.Item>
      ))}
    </Accordion.Root>
  );
};
