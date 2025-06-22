import { Accordion } from "radix-ui";
import styles from "./CategoriesAccordion.module.css";
import { useNavigate } from "react-router-dom";
import { Paths } from "@/routing";
import { ChevronDown, Martini } from "lucide-react";

interface Props {
  title: string;
  onClick: () => void;
}

export const CategoriesAccordion = ({ title, onClick }: Props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`${Paths.Products}?category=${title}`);
    onClick();
  };

  return (
    <Accordion.Root type="single" className={styles.root} collapsible>
      <Accordion.Item value="item-1">
        <Accordion.Trigger className={styles.trigger}>
          <Martini /> <p>{title}</p> <ChevronDown className={styles.chevron} />
        </Accordion.Trigger>
        <Accordion.Content className={styles.content}>
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
            <button
              key={category}
              className={styles.item}
              onClick={handleClick}
            >
              <p>{category}</p>
            </button>
          ))}
        </Accordion.Content>
      </Accordion.Item>
    </Accordion.Root>
  );
};
