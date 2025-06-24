import { ChevronDown } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import styles from "./CategoriesDropdown.module.css";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/routing";
import { useGlobalContext } from "@/context";
import { AllCategory } from "@/models";

export const CategoriesDropdown = () => {
  const navigate = useNavigate();
  const { categories } = useGlobalContext();

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
          {[AllCategory, ...categories].map((category) => (
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
