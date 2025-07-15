import type { Category } from "@/models";
import styles from "./CategoryThumbnail.module.css";

interface Props {
  category: Category;
  onClick: () => void;
  className?: string;
}

export const CategoryThumbnail = ({ category, className, onClick }: Props) => {
  return (
    <div
      className={`${styles.container} ${className}`}
      style={{ backgroundImage: `url(${category.imageUrl})` }}
      onClick={onClick}
    >
      <h2>{category.name}</h2>
    </div>
  );
};
