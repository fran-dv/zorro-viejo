import { NavigateButton } from "@/components";
import styles from "./NotFound.module.css";
import notFoundImage from "@/assets/404.webp";
import { Paths } from "@/routing";

export const NotFound = () => {
  return (
    <div className={styles.container}>
      <img
        className={styles.image}
        src={notFoundImage}
        loading="lazy"
        alt="Imagen de error 404"
      />

      <h1 className={styles.title}>¡Uy, esa página no existe!</h1>
      <p className={styles.subtitle}>
        Parece que el zorro dejó vacía esta página. Pero no te preocupes,
        tenemos muchas bebidas esperándote.
      </p>
      <NavigateButton className={styles.navigateButton} to={Paths.Home}>
        Volver al inicio
      </NavigateButton>
    </div>
  );
};
