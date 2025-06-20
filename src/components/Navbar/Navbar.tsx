import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { ShoppingBag } from "lucide-react";
import { Paths } from "@/routing";
import { CategoriesDropdown } from "@/components";

export const Navbar = () => {
  return (
    <nav className={styles.container}>
      <ul className={styles.linksContainer}>
        <li className={`${styles.title} ${styles.link}`}>
          <Link to={Paths.Home}>
            <h2>Zorro Viejo</h2>
          </Link>
        </li>
        <li className={styles.link}>
          <CategoriesDropdown />
        </li>
        <li>
          <Link className={styles.link} to={Paths.Cart}>
            <ShoppingBag />
          </Link>
        </li>
      </ul>
    </nav>
  );
};
