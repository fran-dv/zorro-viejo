import { ChevronDown } from "lucide-react";
import { DropdownMenu } from "radix-ui";
import styles from "./CategoriesDropdown.module.css";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/routing";

export const CategoriesDropdown = () => {
  const navigate = useNavigate();

  return (
    <div>
      <DropdownMenu.Root>
        <DropdownMenu.Trigger asChild>
          <button className={styles.button}>
            <p>BEBIDAS</p>
            <ChevronDown className={styles.icon} />
          </button>
        </DropdownMenu.Trigger>
        <DropdownMenu.Content className={styles.content}>
          {[
            "Todas",
            "Whisky",
            "Cerveza",
            "Vino tinto",
            "Vino blanco",
            "Vino rosado",
            "Aperitivos",
            "Gins",
          ].map((category) => (
            <DropdownMenu.Item
              key={category}
              className={styles.item}
              onClick={() => navigate(`${Paths.Products}?category=${category}`)}
            >
              <p>{category}</p>
            </DropdownMenu.Item>
          ))}
        </DropdownMenu.Content>
      </DropdownMenu.Root>
    </div>
  );
};
