import styles from "./AddToCartButton.module.css";

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  content?: string;
}

export const AddToCartButton = ({
  onClick,
  className = "",
  content = "Añadir al carrito",
}: Props) => {
  return (
    <button className={`${styles.button} ${className}`} onClick={onClick}>
      <p>{content}</p>
    </button>
  );
};
