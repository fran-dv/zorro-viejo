import React from "react";
import styles from "./Footer.module.css";

export const Footer = React.forwardRef<HTMLElement>((_, ref) => {
  return (
    <footer className={styles.container} ref={ref}>
      <h2>Footer</h2>
    </footer>
  );
});

Footer.displayName = "Footer";
