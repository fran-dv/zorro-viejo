import { RadioGroup } from "radix-ui";
import styles from "./CategoryFilter.module.css";
import type { Category } from "@/models";
import { AllCategory } from "@/models";
import { useState, useEffect, useRef } from "react";
import { useMediaQuery } from "usehooks-ts";

interface Props {
  categories: Category[];
  onChange: (catSlug: string) => void;
  currentCategorySlug: string;
  className?: string;
}

export const CategoryFilter = ({
  categories,
  onChange,
  currentCategorySlug,
  className,
}: Props) => {
  const [value, setValue] = useState(currentCategorySlug);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDesktop = useMediaQuery("(min-width: 850px)");

  useEffect(() => {
    setValue(currentCategorySlug);
  }, [currentCategorySlug]);

  useEffect(() => {
    const container = containerRef.current;
    const selected = container?.querySelector(
      `.${styles.selected}`,
    ) as HTMLElement;

    if (selected) {
      selected.scrollIntoView({
        behavior: "smooth",
        inline: "center",
        block: "nearest",
      });
    }
  }, [value, currentCategorySlug]);

  const handleChange = (catSlug: string) => {
    setValue(catSlug);
    onChange(catSlug);
  };
  return (
    <div className={`${styles.container} ${className ?? ""}`}>
      <p>Filtrar por: </p>
      <div className={styles.rootContainer}>
        <RadioGroup.Root
          onValueChange={handleChange}
          className={`${styles.root} ${!isDesktop ? styles.hideScrollbar : ""}`}
          value={value}
          ref={containerRef}
        >
          {[AllCategory, ...categories].map((cat) => (
            <div
              className={`${styles.optionContainer} ${cat.slug === value ? styles.selected : ""}`}
              key={cat.id}
            >
              <label className={styles.label}>
                <RadioGroup.Item
                  value={cat.slug}
                  id={cat.id.toString()}
                  className={styles.item}
                >
                  <RadioGroup.Indicator className={styles.indicator} />
                </RadioGroup.Item>
                {cat.name}
              </label>
            </div>
          ))}
        </RadioGroup.Root>
      </div>
    </div>
  );
};
