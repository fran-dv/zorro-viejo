import { AspectRatio } from "radix-ui";
import styles from "./ProductImage.module.css";

const productImageRatio = 4 / 3;

interface Props {
  imageUrl: string;
  className?: string;
  productName?: string;
}

export const ProductImage = ({
  imageUrl,
  className = "",
  productName,
}: Props) => {
  return (
    <AspectRatio.Root ratio={productImageRatio}>
      <img
        className={`${styles.image} ${className}`}
        src={imageUrl}
        alt={`Imagen de ${productName ?? "Producto"}`}
      />
    </AspectRatio.Root>
  );
};
