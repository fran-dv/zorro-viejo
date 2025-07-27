import { Dialog } from "radix-ui";
import styles from "./AdminSidebar.module.css";
import { useState } from "react";
import { MenuIcon, X } from "lucide-react";
import logo from "@/assets/zorro-viejo.webp";
import { Link } from "react-router-dom";
import { Paths } from "@/routing";
import { useLogout } from "@refinedev/core";

export const AdminSidebar = () => {
  const [open, setOpen] = useState(false);
  const { mutate: logout } = useLogout();

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <button className={styles.triggerButton}>
        <Dialog.Trigger asChild>
          <MenuIcon className={styles.menuIcon} />
        </Dialog.Trigger>
      </button>

      <Dialog.Portal>
        <Dialog.Overlay className={styles.overlay} />
        <Dialog.Description hidden>
          Navega por las distintas secciones desde este menú.
        </Dialog.Description>
        <Dialog.Content className={styles.content}>
          <Dialog.Close className={styles.closeButton} asChild>
            <X className={styles.closeButton}>Cerrar</X>
          </Dialog.Close>
          <Dialog.Title className={styles.title}>
            <img className={styles.logo} src={logo} alt="Zorro Viejo" />
            Admin
          </Dialog.Title>

          <ul className={styles.linksContainer}>
            <li>
              <Link
                className={styles.link}
                to={Paths.AdminDashboard}
                onClick={handleClose}
              >
                <p>Panel principal</p>
              </Link>
            </li>
            <li>
              <Link
                className={styles.link}
                to={Paths.AdminProductsList}
                onClick={handleClose}
              >
                <p>Productos</p>
              </Link>
            </li>
            <li>
              <Link
                className={styles.link}
                to={Paths.AdminOrdersList}
                onClick={handleClose}
              >
                <p>Órdenes</p>
              </Link>
            </li>
            <li>
              <button className={styles.button} onClick={() => logout()}>
                <p>Cerrar sesión</p>
              </button>
            </li>
          </ul>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};
