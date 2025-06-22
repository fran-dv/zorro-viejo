import { Dialog } from "radix-ui";
import styles from "./MobileNavMenu.module.css";
import { MenuIcon, X } from "lucide-react";
import logo from "@/assets/zorro-viejo.png";
import { useRef } from "react";
import { CategoriesAccordion } from "@/components";
import { Link } from "react-router-dom";
import { Paths } from "@/routing";
import { ShoppingBag } from "lucide-react";

export const MobileNavMenu = () => {
  const contentRef = useRef<HTMLDivElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  const handleClose = () => {
    if (contentRef.current) {
      contentRef.current.classList.add(styles.closeAnimation);
    }
    if (overlayRef.current) {
      overlayRef.current.classList.add(styles.overlayClose);
    }
  };

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <MenuIcon className={styles.menuIcon} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay
          className={styles.overlay}
          ref={overlayRef}
          onClick={handleClose}
        />
        <Dialog.Content className={styles.content} ref={contentRef}>
          <Dialog.Close
            className={styles.closeButton}
            onClick={handleClose}
            asChild
          >
            <X className={styles.closeButton}>Cerrar</X>
          </Dialog.Close>
          <Dialog.Title className={styles.title}>
            <img className={styles.logo} src={logo} alt="Zorro Viejo" />
            <h2>Explorar</h2>
          </Dialog.Title>

          <ul className={styles.linksContainer}>
            <li>
              <Link
                className={styles.link}
                to={Paths.Cart}
                onClick={handleClose}
              >
                <ShoppingBag />
                <p>CARRITO</p>
              </Link>
            </li>
            <li>
              <CategoriesAccordion title="BEBIDAS" onClick={handleClose} />
            </li>
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
