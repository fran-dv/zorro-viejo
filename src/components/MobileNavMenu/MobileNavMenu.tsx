import { Dialog } from "radix-ui";
import styles from "./MobileNavMenu.module.css";
import { MenuIcon, X } from "lucide-react";
import logo from "@/assets/zorro-viejo.png";
import { CategoriesAccordion } from "@/components";
import { Link } from "react-router-dom";
import { Paths } from "@/routing";
import { ShoppingBag } from "lucide-react";
import { useState } from "react";

export const MobileNavMenu = () => {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <MenuIcon className={styles.menuIcon} />
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Description hidden>
          Navega por las distintas secciones de la tienda desde este menú.
        </Dialog.Description>
        <Dialog.Content className={styles.content}>
          <Dialog.Close className={styles.closeButton} asChild>
            <X className={styles.closeButton}>Cerrar</X>
          </Dialog.Close>
          <Dialog.Title className={styles.title}>
            <img className={styles.logo} src={logo} alt="Zorro Viejo" />
            Explorar
          </Dialog.Title>

          <ul className={styles.linksContainer}>
            <li>
              <Link className={styles.link} to={Paths.Cart}>
                <ShoppingBag />
                <p>CARRITO</p>
              </Link>
            </li>
            <li>
              <CategoriesAccordion
                title="BEBIDAS"
                closeCallback={handleClose}
              />
            </li>
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
