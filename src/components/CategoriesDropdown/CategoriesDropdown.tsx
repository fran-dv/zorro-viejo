import { ChevronDown } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import styles from "./CategoriesDropdown.module.css";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/routing";
import { useCategories } from "@/hooks";

export const CategoriesDropdown = () => {
  const navigate = useNavigate();
  const { data: categories } = useCategories();

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={styles.button}>
            <p>BEBIDAS</p>
            <ChevronDown className={`${styles.icon} ${styles.chevron}`} />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className={styles.content}>
          {categories?.map((category) => (
            <DropdownMenu.Item
              key={category.id}
              className={styles.item}
              onClick={() =>
                navigate(`${Paths.Products}?category=${category.slug}`)
              }
            >
              <p>{category.name}</p>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};
