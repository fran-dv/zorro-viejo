import styles from "./ActionButton.module.css";

interface Props {
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  className?: string;
  content?: string;
}

export const ActionButton = ({
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
