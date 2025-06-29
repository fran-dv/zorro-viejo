import { ChevronLeft, ChevronRight } from "lucide-react";
import styles from "./Pagination.module.css";

interface Props {
  className?: string;
  selectedPage: number;
  onPageChange: (page: number) => void;
  pagesAmount: number;
}

const PAGINATOR_ITEMS = 5;

export const Pagination = ({
  className,
  selectedPage,
  onPageChange,
  pagesAmount,
}: Props) => {
  const pages = Array.from({ length: pagesAmount }, (_, i) => i + 1);

  const calculatePagesToShow = () => {
    if (pagesAmount <= PAGINATOR_ITEMS) return pages;

    let startPage = Math.max(1, selectedPage - Math.floor(PAGINATOR_ITEMS / 2));
    const endPage = Math.min(pagesAmount, startPage + PAGINATOR_ITEMS - 1);

    if (endPage - startPage < PAGINATOR_ITEMS - 1) {
      startPage = Math.max(1, endPage - PAGINATOR_ITEMS + 1);
    }
    return pages.slice(startPage - 1, endPage);
  };

  const pagesToShow = calculatePagesToShow();

  const previousPage = selectedPage - 1;
  const nextPage = selectedPage + 1;

  const handleChange = (value: number) => {
    onPageChange(value);
  };

  const getPageClasses = (page: number, isSelected: boolean): string => {
    const baseClasses = `${styles.item}`;
    const firstClasses = page === 1 && isSelected ? styles.first : "";
    const selectedClasses = isSelected ? styles.selected : "";
    const lastClasses = page === pagesAmount && isSelected ? styles.last : "";

    return [baseClasses, firstClasses, selectedClasses, lastClasses]
      .filter(Boolean)
      .join(" ");
  };

  return (
    <div className={`${styles.root} ${className}`}>
      {selectedPage > 1 && (
        <button
          value={"prev"}
          onClick={() => handleChange(previousPage)}
          className={`${styles.item} ${styles.first}`}
        >
          <ChevronLeft className={styles.chevron} />
        </button>
      )}
      {pagesToShow.map((page) => {
        return (
          <button
            key={page}
            value={page.toString()}
            className={getPageClasses(page, selectedPage === page)}
            onClick={() => handleChange(page)}
          >
            <p>{page}</p>
          </button>
        );
      })}
      {selectedPage < pagesAmount && (
        <button
          value={"next"}
          onClick={() => handleChange(nextPage)}
          className={`${styles.item} ${styles.last}`}
        >
          <ChevronRight className={styles.chevron} />
        </button>
      )}
    </div>
  );
};
