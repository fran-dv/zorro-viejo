import React, { useEffect } from "react";
import styles from "./Footer.module.css";
import logo from "@/assets/zorro-viejo.webp";
import { getWhatsappLink } from "@/utils";

export const Footer = React.forwardRef<HTMLElement>((_, ref) => {
  const [whatsappLink, setWhatsappLink] = React.useState<string>("");
  useEffect(() => {
    (async () => {
      setWhatsappLink(
        await getWhatsappLink({
          shorten: false,
          userAgent: "auto",
          message: "Hola! quería hacerte una consulta",
        }),
      );
    })();
  }, []);
  return (
    <footer className={styles.container} ref={ref}>
      <section className={styles.brand}>
        <img src={logo} className={styles.logo} alt="Zorro viejo" />
        <h2 className={styles.title}>Zorro Viejo</h2>
      </section>
      <section className={styles.links}>
        <h4>¿Tienes alguna duda?</h4>
        <ul>
          <li>
            <a href={whatsappLink} target="_blank">
              Contáctanos
            </a>
          </li>
          <li>
            <p>Chascomús, Buenos Aires</p>
          </li>
        </ul>
      </section>
    </footer>
  );
});

Footer.displayName = "Footer";
