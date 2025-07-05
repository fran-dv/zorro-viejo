import { useMediaQuery } from "usehooks-ts";
import styles from "./SearchInterface.module.css";
import { MobileSearchDialog, SearchBar } from "@/components";

interface Props {
  floatingButtonClassName?: string;
}

export const SearchInterface = ({ floatingButtonClassName = "" }: Props) => {
  const isDesktop = useMediaQuery("(min-width: 850px)");
  return (
    <div className={styles.container}>
      {!isDesktop && (
        <MobileSearchDialog floatingButtonClassName={floatingButtonClassName} />
      )}

      {isDesktop && (
        <div className={styles.searchBarContainer}>
          <SearchBar placeholder="Buscar un producto. Por ej. 'Chateau Subsónico' ..." />
        </div>
      )}
    </div>
  );
};
