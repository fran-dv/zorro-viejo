import { Dialog } from "radix-ui";
import styles from "./MobileSearchDialog.module.css";
import { Search, X } from "lucide-react";
import { useState } from "react";
import { SearchBar } from "../SearchBar";

export const MobileSearchDialog = () => {
  const [open, setOpen] = useState(false);

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      {!open && (
        <Dialog.Trigger
          className={styles.searchCircle}
          title="Buscar producto"
          onClick={() => setOpen(!open)}
        >
          <Search className={styles.icon} />
        </Dialog.Trigger>
      )}

      <Dialog.Overlay className={styles.overlay} />
      <Dialog.Content
        className={styles.content}
        onInteractOutside={(e) => {
          const isPopover = (e.target as HTMLElement).closest(
            "[data-radix-popper-content-wrapper]",
          );
          if (!isPopover) e.preventDefault();
        }}
      >
        <Dialog.Close className={styles.searchCircle}>
          <X className={styles.icon} />
        </Dialog.Close>
        <Dialog.Title>Buscar un producto</Dialog.Title>
        <Dialog.Description hidden>
          Buscar un producto. Por ej. 'Chateau Subsónico'
        </Dialog.Description>
        <div className={styles.searchContainer}>
          <SearchBar
            placeholder="Buscar un producto. Por ej. 'Chateau Subsónico' ..."
            autoFocus={true}
          />
        </div>
      </Dialog.Content>
    </Dialog.Root>
  );
};
