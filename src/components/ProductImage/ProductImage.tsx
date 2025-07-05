import { AspectRatio } from "radix-ui";
import styles from "./ProductImage.module.css";

const productImageRatio = 4 / 3;

interface Props {
  imageUrl: string;
  className?: string;
}

export const ProductImage = ({ imageUrl, className = "" }: Props) => {
  return (
    <AspectRatio.Root ratio={productImageRatio}>
      <img
        className={`${styles.image} ${className}`}
        src={imageUrl}
        alt="Product"
      />
    </AspectRatio.Root>
  );
};
