import { Accordion } from "radix-ui";
import styles from "./CategoriesAccordion.module.css";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/routing";
import { ChevronDown, Martini } from "lucide-react";
import { useCategories } from "@/hooks";

interface Props {
  title: string;
}

export const CategoriesAccordion = ({ title }: Props) => {
  const navigate = useNavigate();
  const { data: categories } = useCategories();

  const handleClick = (catSlug: string) => {
    navigate(`${Paths.Products}?category=${catSlug}`);
  };

  return (
    <Accordion.Root type="single" className={styles.root} collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Trigger className={styles.trigger}>
          <Martini /> <p>{title}</p> <ChevronDown className={styles.chevron} />
        </Accordion.Trigger>
        <Accordion.Content className={styles.content}>
          {categories?.map((category) => (
            <button
              key={category.id}
              className={styles.item}
              onClick={() => handleClick(category.slug)}
            >
              <p>{category.name}</p>
            </button>
          ))}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
